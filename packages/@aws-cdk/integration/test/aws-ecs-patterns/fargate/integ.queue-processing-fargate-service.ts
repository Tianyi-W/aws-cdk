import * as path from 'path';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as ecs from '@aws-cdk/aws-ecs';
import { QueueProcessingFargateService } from '@aws-cdk/aws-ecs-patterns';
import { App, Stack } from '@aws-cdk/core';


const app = new App();
const stack = new Stack(app, 'aws-ecs-patterns-queue');
const vpc = new ec2.Vpc(stack, 'VPC', {
  maxAzs: 2,
});

new QueueProcessingFargateService(stack, 'QueueProcessingService', {
  vpc,
  memoryLimitMiB: 512,
  image: new ecs.AssetImage(path.join(__dirname, '..', 'sqs-reader')),
  minScalingCapacity: 0,
});

app.synth();
