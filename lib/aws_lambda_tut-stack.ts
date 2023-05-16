import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {CodePipeline, CodePipelineSource, ManualApprovalStep, ShellStep} from "aws-cdk-lib/pipelines";
import {JabrealsPipelineAppStage} from "./stage";
import {Aws} from "aws-cdk-lib";


export class AwsLambdaTutStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "jabrealspipeline", {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('synth', {
        input: CodePipelineSource.gitHub('jabrealmoe/aws_lambda_tut', 'main', {

        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth']
      })
    })

    const testingStage = pipeline.addStage(new  JabrealsPipelineAppStage(this,   "testing", {
      env: {account: Aws.ACCOUNT_ID, region: Aws.REGION}
    }))
    testingStage.addPost(new  ManualApprovalStep('Manual  Approval before production'))

    const prodStage = pipeline.addStage(new  JabrealsPipelineAppStage(this,   "production", {
      env: {account: Aws.ACCOUNT_ID, region: Aws.REGION}
    }))
  }
}
