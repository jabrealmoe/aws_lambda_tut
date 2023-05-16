#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsLambdaTutStack } from '../lib/aws_lambda_tut-stack';
import {Aws} from "aws-cdk-lib";

const app = new cdk.App();
new AwsLambdaTutStack(app, 'AwsLambdaTutStack', {
    env: {
        account: Aws.ACCOUNT_ID,
        region: Aws.REGION
    }
});

app.synth()