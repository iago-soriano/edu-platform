#!/bin/bash
set -e

echo "--- DEPLOY DEPENDENCIES ---"

aws s3 cp nodejs.zip s3://edu-platform-function/dependencies/$DEPENDENCIES_VERSION/nodejs.zip

# echo "Starting terraform apply..."
# terraform apply -var="dependencies_version=$DEPENDENCIES_VERSION"