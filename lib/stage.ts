import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import {JabrealsLambdaStack} from "./lambda-stack";


export class JabrealsPipelineAppStage extends cdk.Stage {
    constructor(scope: Construct, stageName: string, props?: cdk.StageProps) {
      super(scope, stageName, props);
      const lambdaStack = new JabrealsLambdaStack(this, 'JJLambStack', stageName);
    }
}
