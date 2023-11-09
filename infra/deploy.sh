cd ../apps/poc
zip -r ../../infra/build.zip ./build
cd ../../infra
aws s3 cp build.zip s3://edu-platform-function/v0.0.0-beta/build.zip