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
cd ../../apps/web-api/build/index.api
7z a -tzip ../../../../infra/build-api.zip index.js

echo "Zipping event-handler..."
cd ../index.sqs
rm -f ../../../../infra/build-event-handler.zip
7z a -tzip ../../../../infra/build-event-handler.zip index.js

echo "Uploading packages to S3..."
cd ../../../../infra
aws s3 cp build-api.zip "s3://edu-platform-lambda-function-build-output/api/$NEW_VERSION/build.zip"
aws s3 cp build-event-handler.zip "s3://edu-platform-lambda-function-build-output/event-handler/$NEW_VERSION/build.zip"

echo "Starting terraform apply..."
terraform apply -var="app_version=$NEW_VERSION"

cd scripts
echo "FUNCTION_VERSION=$NEW_VERSION" > ./config.sh