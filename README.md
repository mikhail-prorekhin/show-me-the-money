# Show-me-the-money

## About

Hi there,<br>
I would like to present a small chalemge task for DemystData,
please see [the requarentmens](https://github.com/DemystData/code-drills/tree/main/show-me-the-money)<br>
This solution is targeting to run on AWS enviriment using S3 buckets, Lambda + API gateway protected a key api and EKS with Load balancer
You also can see another chalemge task which does not requare AWS and mostly demontrates authentication.

## Build and deploy

### Enviroment settings

To run deploy/undeploy scripts, please enchure You had set neccesary variables

```
export AWS_ACCESS_KEY_ID=<Yoour key id>
export AWS_SECRET_ACCESS_KEY=<Your access key>
export AWS_DEFAULT_REGION=<Your region>
```

### Xero image

To run test service [image](https://github.com/DemystData/code-drills/tree/main/show-me-the-money) you can use AWS EKS <br>

```
cd show_me_the_money_aws_be/stub-k8s
eksctl create cluster -f ./create-show-me-the-money-stub.yaml
kubectl apply  -f show-me-the-money-stub.yaml
```

### Backend Service

Api is imlemented on Python and deployed AWS Lambda and API Gateway<br>

1. Copy Your Xero service API What You just deployed
2. Set Api url in <b>show_me_the_money_aws_be/terraform/variables.tf</b> file<br>
   <b>xero_api_url</b> - your stage deploy, for example <i>http://your.url.api-southeast-2.elb.amazonaws.com/api.xro/2.0</i>
3. Run deploy script

```
cd show_me_the_money_aws_be/terraform
terraform init
ferraform apply
```

### Web page

The static web page inplemented as a single page application using React<br>

1. Copy Your API deployed stage url (as ip printed on previous step) and api key.
2. Set Api url and key id in <b>show_me_the_money_aws_fe/src/constants/api.ts</b> file<br>
   <b>apiURL</b> - your stage deploy, for example <i>http://your.url.xxxxxx.amazonaws.com/dev</i><br>
   <b>apiKey</b> - your generated api key
3. Make a build

```
cd show_me_the_money_aws_fe
npm i
npm run build
```

4. Run deploy script

```
cd show_me_the_money_aws_fe/terraform
terraform init
ferraform apply
```

### Undeploy

1. Undeploy web page

```
cd show_me_the_money_aws_fe/terraform
ferraform destroy
```

2. Delete api

```
cd show_me_the_money_aws_be/terraform
ferraform destroy
```

3. Delete k8s

```
cd show_me_the_money_aws_be/stub-k8s
kubectl delete   -f show-me-the-money-stub.yaml
eksctl delete  cluster -f ./create-show-me-the-money-stub.yaml  --disable-nodegroup-eviction
```
