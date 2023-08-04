import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from "path";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';

export class CdkMbqStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const api = new RestApi(this, "BlockchainAPI");

        const func = new NodejsFunction(this, "BlockchainLambda", {
            entry: path.resolve(__dirname, "lambdas/Blockchain.lambda.ts"),
            runtime: Runtime.NODEJS_18_X,
            initialPolicy: [
                new PolicyStatement({
                  actions: ["managedblockchain-query:*"],
                  resources: ["*"]
                }),
            ],
            bundling: {
                // https://github.com/aws/aws-sdk-js-v3/issues/4401
                nodeModules: ["@aws-sdk/client-managedblockchain-query"],
            }
        });

        api.root.resourceForPath("/example").addMethod("GET", new LambdaIntegration(func));
    }
}
