#!/bin/bash
set -e
CONFIG_PATH="./deploy/config.sh"

source "$CONFIG_PATH"

# BUILD

echo "Building common packages..."
cd ../../packages/common
rm -rf build/
npm run build
# copy package.json into build output, so that we can pack it into an npm installable
cp ./package.json ./build/package.json
cd build
echo "Packing tarball file..."
# create npm package and move it to function folder
npm pack .
mv ./edu-platform-common-0.0.1.tgz ../../../apps/\"$APP_NAME\"/common.tgz
#cd ..
#rm -rf build/ # NEED THIS?

echo "Installing common packages..."
cd ../../apps/\"$APP_NAME\"
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

overwrite_current_versions() {
    echo "DEPENDENCIES_VERSION=\"$DEPENDENCIES_VERSION\"" > $CONFIG_PATH
    echo "FUNCTION_VERSION=\"$FUNCTION_VERSION\"" >> $CONFIG_PATH
}



