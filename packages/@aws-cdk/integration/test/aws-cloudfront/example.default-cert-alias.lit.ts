import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as s3 from '@aws-cdk/aws-s3';
import { App, Stack } from '@aws-cdk/core';
import { Construct } from 'constructs';

class AcmCertificateAliasStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    /// !show
    const s3BucketSource = new s3.Bucket(this, 'Bucket');

    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'AnAmazingWebsiteProbably', {
      originConfigs: [{
        s3OriginSource: { s3BucketSource },
        behaviors: [{ isDefaultBehavior: true }],
      }],
      viewerCertificate: cloudfront.ViewerCertificate.fromCloudFrontDefaultCertificate(
        'www.example.com',
      ),
    });
    /// !hide

    Array.isArray(s3BucketSource);
    Array.isArray(distribution);
  }
}

const app = new App();
new AcmCertificateAliasStack(app, 'AcmCertificateAliasStack');
app.synth();
