require('dotenv').config();
const { log } = require('./util/logger.js');
const userService = require('./service/userService');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    await log('Received event: ' + JSON.stringify(event, null, 2));

    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };

    if (event.requestContext.routeKey == 'GET /user') {
        const discordUser = event.queryStringParameters.discordUser;
        try {
            body = await userService.getUserByDiscordId(docClient, discordUser)
        } catch (err) {
            if (err.message == 'user not found') {
                statusCode = '404';
            } else {
                statusCode = '500';
            }
            body = {
                error: 'get user failed',
                errorDetail: err.message
            }
        }
    } else {
        statusCode = '404'
    }

    body = JSON.stringify(body);
    return {
        statusCode,
        body,
        headers,
    };
};