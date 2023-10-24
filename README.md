# jwt_auth0_custom_authoriser

If 
 1. You are using AWS ApigateWay.
 2. AWS Lambda for your function code.
 3. And you want to configure a custom authoriser to authenticate each call.
 4. Looking for a AWS SAM Template that can create this Lambda and all necessary IAM roles with needed permissions. 

This repository is for you. It is forked from https://github.com/auth0-samples/jwt-rsa-aws-custom-authorizer. But i find that as old and not ready to use with latest AWS lambda enviroments. The code here is ES-Module compatible. So should work out of the box.

## Pre Requisite
 1. SAM CLI Configured on your machine and linked to your aws account.

## TODO
 1. Replace your token audience and issuer info in the .env and template.yaml file
 2. Customise the event.json to carry your test tokens.


