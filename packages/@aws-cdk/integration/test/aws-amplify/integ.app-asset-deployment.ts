/// !cdk-integ pragma:ignore-assets
import * as path from 'path';
import * as amplify from '@aws-cdk/aws-amplify';
import { Asset } from '@aws-cdk/aws-s3-assets';
import { App, Stack, StackProps } from '@aws-cdk/core';
import { Construct } from 'constructs';

class TestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const asset = new Asset(this, 'SampleAsset', {
      path: path.join(__dirname, './test-asset'),
    });

    const amplifyApp = new amplify.App(this, 'App', {});
    amplifyApp.addBranch('main', { asset });
  }
}

const app = new App();
new TestStack(app, 'cdk-amplify-app-asset-deployment');
app.synth();
