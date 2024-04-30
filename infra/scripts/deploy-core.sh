#!/bin/bash
set -e

sed -i 's/\r$//' ./config.sh
source "./config.sh"
echo "Current App version: $FUNCTION_VERSION. What is the new version?"
read NEW_VERSION

echo "Building application..."
cd ../../apps/web-api
npm run build:ci

echo "Zipping api..."
rm -f ../../infra/build-api.zip
zip -rj ../../infra/build-api.zip ./build/index.api/index.js

echo "Zipping event-handler..."
rm -f ../../infra/build-event-handler.zip
zip -rj ../../infra/build-event-handler.zip ./build/index.sqs/index.js

echo "Uploading packages to S3..."
cd ../../infra
aws s3 cp build-api.zip "s3://edu-platform-lambda-function-code/api/$NEW_VERSION/build.zip"
aws s3 cp build-event-handler.zip "s3://edu-platform-lambda-function-code/event-handler/$NEW_VERSION/build.zip"

echo "Starting terraform apply..."
terraform apply -var="app_version=$NEW_VERSION"

cd scripts
echo "FUNCTION_VERSION=$NEW_VERSION" > ./config.sh