# aws-contactus-api

This project handles notifying a website owner when a "contact us" form is submitted on their webiste.

It is written in TypeScript for NodeJs and HTTP requests are served using Express.  

It is designed to be run as an AWS Lambda and comes packaged with Bitbucket Pipelines CI/CD configuration (bitbucket-pipelines.yml) for an AWS deployment.

When the API is hit, it will send a text message (SMS) and an email to the email address and phone number specified in serverless.yml.

The API accepts POST requests and the expected inputs are are follows:


URI: /contact
METHOD: POST
VALUES:
 - full_name
 - email_address
 - phone_number
 - zip_code
 - message
