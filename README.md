# mc-user
[![Latest Release](https://img.shields.io/github/v/release/Ubunfu/mc-user)](https://github.com/Ubunfu/mc-user/releases)
[![codecov](https://codecov.io/gh/Ubunfu/mc-user/branch/master/graph/badge.svg?token=41OYQX1DGV)](https://codecov.io/gh/Ubunfu/mc-user)
[![CircleCI](https://img.shields.io/circleci/build/github/Ubunfu/mc-user?logo=circleci)](https://app.circleci.com/pipelines/github/Ubunfu/mc-user)
![Contrubutors](https://img.shields.io/github/contributors/Ubunfu/mc-user?color=blue)
![Last Commit](https://img.shields.io/github/last-commit/Ubunfu/mc-user)

Maintains and provides access to a correlation between Discord usernames and Minecraft usernames.

This service runs as an AWS lambda function.

## Configuration
### IAM Role
AWS's standard IAM role for Lambda micro services is plenty sufficient. The only access that is required is read/write for DynamoDB, and write to CloudWatch logs.

* AWSLambdaMicroserviceExecutionRole
* AWSLambdaBasicExecutionRole

### Environment Variables
| Parameter                    | Description                                                                       | Default | Required? |
|------------------------------|-----------------------------------------------------------------------------------|---------|-----------|
| TABLE_USERS                  | The name of a DynamoDB table correlating Discord usernames to Minecraft usernames.| n/a     | Yes       |
| LOGGER_ENABLED               | Boolean value controlling writing of logs. Useful to turn off for test execution. | n/a     | Yes       |