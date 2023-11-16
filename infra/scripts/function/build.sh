#!/bin/bash
set -e

echo "--- BUILD FUNCTION ---"
echo "Building application..."
cd ../apps/poc
rm -rf build/
npm run build

echo "Building common packages..."
cd ../../packages/common
# build monorepo common package, since it is in TS
rm -rf build/
npm run build
# copy package.json into build output, so that we can pack it into an npm installable
cp ./package.json ./build/package.json
cd build
# create npm package and move it to function folder
npm pack .
mv ./edu-platform-common-0.0.1.tgz ../../../apps/poc/common.tgz
cd ..
rm -rf build/

echo "Installing common packages..."
cd ../../apps/poc
npm i --ws=false common.tgz
mkdir -p build/node_modules
mv ./node_modules/@edu-platform/ ./build/node_modules/@edu-platform/

echo "Zipping output..."
rm -f ../../infra/build.zip
zip -r ../../infra/build.zip ./build

echo "Cleaning up..."
rm -rf build/
rm -rf node_modules/
rm -f ./common.tgz
cd ../../infra

