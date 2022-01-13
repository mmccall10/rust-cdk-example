#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { RustCdkStack } from "../lib/rust-cdk-stack";

const app = new cdk.App();
new RustCdkStack(app, "RustCdkStack", {});
