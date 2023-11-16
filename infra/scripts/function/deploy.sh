#!/bin/bash
set -e

echo "--- DEPLOY FUNCTION ---"

echo "Uploading package to S3..."
aws s3 cp build.zip "s3://edu-platform-function/api/$FUNCTION_VERSION/build.zip"

echo "Starting terraform apply..."
terraform apply -var="app_version=$FUNCTION_VERSION" -var="dependencies_version=$DEPENDENCIES_VERSION"
