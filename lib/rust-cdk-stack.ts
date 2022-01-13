import {
  Stack,
  StackProps,
  aws_lambda as lambda,
  aws_lambda_nodejs as nodeFn,
} from "aws-cdk-lib";
import * as apigw2 from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import { Architecture } from "aws-cdk-lib/aws-lambda";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";

export class RustCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const rustFn = new lambda.Function(this, "RustHello", {
      code: lambda.Code.fromAsset("rust/hello/runtime/"),
      runtime: lambda.Runtime.PROVIDED_AL2,
      architecture: Architecture.ARM_64,
      handler: "rust.up",
      environment: {
        RUST_BACKTRACE: "1",
      },
      logRetention: RetentionDays.ONE_DAY,
    });

    const nodefn = new nodeFn.NodejsFunction(this, "hello");

    const api = new apigw2.HttpApi(this, "RustApi");

    api.addRoutes({
      integration: new HttpLambdaIntegration("RustHelloIntegration", rustFn),
      path: "/hello-rust/{name}",
      methods: [apigw2.HttpMethod.GET],
    });

    api.addRoutes({
      integration: new HttpLambdaIntegration("NodeHelloIntegration", nodefn),
      path: "/hello-node/{name}",
      methods: [apigw2.HttpMethod.GET],
    });
  }
}
