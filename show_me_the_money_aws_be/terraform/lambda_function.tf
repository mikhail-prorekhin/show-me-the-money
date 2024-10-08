resource "aws_lambda_function" "this" {
  function_name    = var.name
  description      = "Show me the noney application"
  role             = aws_iam_role.lambda.arn
  runtime          = "python3.9"
  handler          = "get_balance_handler.lambda_handler"
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  tags             = var.tags

  environment {
    variables = {

      XERO_API    = var.xero_api_url
      GET_BALANCE = var.xero_get_balance
    }
  }
}

data "archive_file" "lambda_zip" {
  type        = "zip"
  output_path = "../build/lambda_function.zip"
  source_dir  = "../src"
}

resource "aws_iam_role" "lambda" {
  name               = "${var.name}-iam-role"
  tags               = var.tags
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": ["lambda.amazonaws.com"]
      },
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "lambda_policy" {
  name   = "${var.name}-iam-role-policy"
  tags   = var.tags
  policy = <<EOF
{
      "Version": "2012-10-17",
      "Statement": [
          {
              "Sid"   : "LoggingPermissions",
              "Effect": "Allow",
              "Action": [
                  "logs:CreateLogGroup",
                  "logs:CreateLogStream",
                  "logs:PutLogEvents"
              ],
              "Resource": [
                  "arn:aws:logs:*:*:*"
              ]
          }
      ]
}
EOF
}

resource "aws_iam_policy_attachment" "lambda" {
  name       = "${var.name}-iam-policy-attachment"
  roles      = [aws_iam_role.lambda.name]
  policy_arn = aws_iam_policy.lambda_policy.arn
}
