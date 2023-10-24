# jwt_auth0_custom_authoriser

This repository is for you if 

 1. You are using AWS ApigateWay.
 2. AWS Lambda for your function code.
 3. Authorisation header in each call carries a JWT OAuth Token. 
 4. And you want to configure a custom authoriser to authenticate each call.
 5. Looking for a AWS SAM Template that can create this Lambda and all necessary IAM roles with needed permissions. 

It is forked from https://github.com/auth0-samples/jwt-rsa-aws-custom-authorizer. But i find that as old and not ready to use with latest AWS lambda enviroments. The code here is ES-Module compatible. So should work out of the box.

## Pre Requisite
 1. SAM CLI Configured on your machine and linked to your aws account.

## TODO
 1. Replace your token audience and issuer info in the .env and template.yaml file
 2. Customise the event.json to carry your test tokens.

## Inspiration
AWS apigateway provides a default JWT Authoriser that you can use out of the box. But it has some limitations like the one we faced. Where Default Authoriser has set an 1500MS Timeout on network calls to get signing key from the auth provider. For my case it was auth0. Because of this timeout 5% randomaly api calls were throwing 401. In order to fix this i followed guide to build custom authoriser and updated it to work with latets sam template. Fixed all the issues related to permission i found. Now it is a ready to use code.

Hope it helps save someones time




