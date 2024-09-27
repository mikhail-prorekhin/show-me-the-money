provider "aws" {

}

resource "aws_api_gateway_api_key" "api_key" {
  name    = "ApiKey"
  enabled = true
}

resource "aws_api_gateway_rest_api" "reports" {
  name        = "${var.name}-api"
  description = "API for AWS Lambda"
  tags        = var.tags
  endpoint_configuration {
    types = ["REGIONAL"]
  }
}


resource "aws_api_gateway_resource" "reports" {
  rest_api_id = aws_api_gateway_rest_api.reports.id
  parent_id   = aws_api_gateway_rest_api.reports.root_resource_id
  path_part   = "reports"
}


resource "aws_api_gateway_method" "reports" {
  authorization    = "NONE"
  http_method      = "GET"
  resource_id      = aws_api_gateway_resource.reports.id
  rest_api_id      = aws_api_gateway_rest_api.reports.id
  api_key_required = true

  request_parameters = {
    "method.request.header.Access-Control-Allow-Headers" = true,
    "method.request.header.Access-Control-Allow-Methods" = true,
    "method.request.header.Access-Control-Allow-Origin"  = true
  }

}

resource "aws_api_gateway_integration" "reports" {
  rest_api_id             = aws_api_gateway_rest_api.reports.id
  resource_id             = aws_api_gateway_resource.reports.id
  http_method             = aws_api_gateway_method.reports.http_method
  integration_http_method = "POST"
  type                    = "AWS"
  uri                     = aws_lambda_function.this.invoke_arn
}

resource "aws_api_gateway_method_response" "reports" {
  rest_api_id = aws_api_gateway_rest_api.reports.id
  resource_id = aws_api_gateway_resource.reports.id
  http_method = aws_api_gateway_method.reports.http_method
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin"  = true
  }

}

resource "aws_api_gateway_integration_response" "reports" {
  rest_api_id = aws_api_gateway_rest_api.reports.id
  resource_id = aws_api_gateway_resource.reports.id
  http_method = aws_api_gateway_method.reports.http_method
  status_code = aws_api_gateway_method_response.reports.status_code
  depends_on  = [aws_api_gateway_integration.reports]

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS'",
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

}


resource "aws_lambda_permission" "reports" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.this.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.reports.execution_arn}/*"
}

resource "aws_api_gateway_deployment" "reports" {
  rest_api_id = aws_api_gateway_rest_api.reports.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_method.reports.id,
      aws_api_gateway_integration.reports.id,
      aws_api_gateway_method_response.reports,
      aws_api_gateway_integration_response.reports,
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
  depends_on = [aws_api_gateway_integration.reports]
}

resource "aws_api_gateway_stage" "dev" {
  deployment_id = aws_api_gateway_deployment.reports.id
  rest_api_id   = aws_api_gateway_rest_api.reports.id
  stage_name    = "dev"
  tags          = var.tags
}

resource "aws_api_gateway_usage_plan" "api_usage_plan" {
  name = "UsagePlan"
  api_stages {
    api_id = aws_api_gateway_rest_api.reports.id
    stage  = aws_api_gateway_stage.dev.stage_name
  }
}

resource "aws_api_gateway_usage_plan_key" "api_usage_plan_key" {
  key_id        = aws_api_gateway_api_key.api_key.id
  key_type      = "API_KEY"
  usage_plan_id = aws_api_gateway_usage_plan.api_usage_plan.id
}




resource "aws_api_gateway_method" "options_method" {
  rest_api_id   = aws_api_gateway_rest_api.reports.id
  resource_id   = aws_api_gateway_resource.reports.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "options_integration" {
  rest_api_id = aws_api_gateway_rest_api.reports.id
  resource_id = aws_api_gateway_resource.reports.id
  http_method = aws_api_gateway_method.options_method.http_method
  type        = "MOCK"

  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

resource "aws_api_gateway_method_response" "options_method_response" {
  rest_api_id = aws_api_gateway_rest_api.reports.id
  resource_id = aws_api_gateway_resource.reports.id
  http_method = aws_api_gateway_method.options_method.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Headers" = true
  }
}

resource "aws_api_gateway_integration_response" "options_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.reports.id
  resource_id = aws_api_gateway_resource.reports.id
  http_method = aws_api_gateway_method.options_method.http_method
  status_code = aws_api_gateway_method_response.options_method_response.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS'"
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'"
  }
}
