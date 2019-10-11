# Columbus Commons Events

Express application that exposes a REST API to view events in the Columbus Commons for Slack command integration.

You can integrate this app with your Slack channel by using the following endpoint:

`POST /events/slack/command`

This endpoint will read the `text` property in the Slack request body to fetch the events.  This text will read the string `today`, `tomorrow`, or a date in varying different formats (such as `MM/DD/YYYY`)

If you want to make a request to the API to retrieve the events without using the Slack request payload, you can use the `GET /events?when=<string>` endpoint.  This endpoint requires a `when` query string which can be `today`, `tomorrow`, or a date in varying different formats (such as `MM/DD/YYYY`)

## Running the application

### Requirements
Node 10.14.0 or higher
Yarn 1.12.3 or higher or 

### Running for Development
You can run this app locally by running `yarn run dev`.  This will launch the app with [nodemon](https://nodemon.io/) running.

### Running for Production
Running `yarn start` will run the application.  
In order to authenticate with your Slack workspace that you want to integrate with, you will need to provide your signing secret as an environmnet variable called `SIGNING_SECRET`.  To learn more about the signing secret, you can look at [Slack's documentation](https://api.slack.com/docs/verifying-requests-from-slack)
