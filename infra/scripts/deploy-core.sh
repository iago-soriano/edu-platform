#!/bin/bash
set -e

sed -i 's/\r$//' ./config.sh
source "./config.sh"
echo "Current App version: $CORE_FUNCTION_VERSION"

# echo "Building application..."
cd ../../apps/core-api
npm run build:ci

echo "Zipping core-api..."
rm -f ../../infra/build-core-api.zip
zip -rj ../../infra/build-core-api.zip ./build/api-gateway/index.js

echo "Zipping core-event-handler..."
rm -f ../../infra/build-core-event-handler.zip
zip -rj ../../infra/build-core-event-handler.zip ./build/sqs/index.js

echo "Uploading packages to S3..."
cd ../../infra
aws s3 cp build-core-api.zip "s3://edu-platform-lambda-function-code/core-api/$CORE_FUNCTION_VERSION/build.zip"
aws s3 cp build-core-event-handler.zip "s3://edu-platform-lambda-function-code/core-event-handler/$CORE_FUNCTION_VERSION/build.zip"

echo "Starting terraform apply..."
terraform apply -var="core_app_version=$CORE_FUNCTION_VERSION"