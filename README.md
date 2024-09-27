# Show-me-the-money

## About

Hi there,<br>
This repository contains a small challenge task designed for DemystData. You can find the original requirements [here](https://github.com/DemystData/code-drills/tree/main/show-me-the-money)<br>
The solution is built to run in an AWS environment utilizing services like S3 buckets, Lambda, API Gateway (secured by an API key), and EKS with a Load Balancer.
## Build and deploy

### Enviroment settings

Before running the deployment or teardown scripts, ensure you have set the necessary AWS environment variables:

```
export AWS_ACCESS_KEY_ID=<Your Key ID>
export AWS_SECRET_ACCESS_KEY=<Your Secret Access Key>
export AWS_DEFAULT_REGION=<Your Region>
```

### Xero image

To run the test service ([Xero stub](https://github.com/DemystData/code-drills/tree/main/show-me-the-money)), you can deploy it on AWS EKS.<br>

```
cd show_me_the_money_aws_be/stub-k8s
eksctl create cluster -f ./create-show-me-the-money-stub.yaml
kubectl apply  -f show-me-the-money-stub.yaml
```

### Backend Service

The API is implemented in Python and deployed using AWS Lambda and API Gateway.<br>

1. After deploying the Xero service, copy the API URL.
2. Set Api url in <b>show_me_the_money_aws_be/terraform/variables.tf</b> file<br>
   - <b>xero_api_url</b> - Replace with your deployed stage URL (e.g., http://your.url.api-southeast-2.elb.amazonaws.com/api.xro/2.0).
3. Install a depeddency
```
cd show_me_the_money_aws_be/src
pip install requests -t .
```
4. Deploy the backend service using Terraform:
```
cd show_me_the_money_aws_be/terraform
terraform init
ferraform apply
```

### Web page

The static web page is a single-page application (SPA) implemented in React.<br>

1. After deploying the backend, copy the API URL and the generated API key.
2. Update the <b>show_me_the_money_aws_fe/src/constants/api.ts</b> file:
   - <b>apiURL</b>: Your backend stage URL (e.g., http://your.url.xxxxxx.amazonaws.com/dev).
   - <b>apiKey</b>: Your generated API key.
3. Build the frontend:

```
cd show_me_the_money_aws_fe
npm i
npm run build
```

4. Deploy the frontend using Terraform:

```
cd show_me_the_money_aws_fe/terraform
terraform init
ferraform apply
```

### Undeploy

To tear down the solution:

1. Undeploy the web application:
```
cd show_me_the_money_aws_fe/terraform
ferraform destroy
```

2. Undeploy the backend API:
```
cd show_me_the_money_aws_be/terraform
ferraform destroy
```

3. Delete the Xero stub service and EKS cluster:
```
cd show_me_the_money_aws_be/stub-k8s
kubectl delete   -f show-me-the-money-stub.yaml
eksctl delete  cluster -f ./create-show-me-the-money-stub.yaml  --disable-nodegroup-eviction
```
