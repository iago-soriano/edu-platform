#!/bin/bash
set -e

echo "--- BUILD DEPENDENCIES ---"
echo "Installing Dependencies..."
cd ../apps/poc
rm -rf node_modules/
rm -rf nodejs/
npm i --ws=false --omit=dev

echo "Moving Dependencies..."
mkdir nodejs
mv node_modules/ nodejs/node_modules/

echo "Zipping dependencies..."
rm -f ../../infra/nodejs.zip
zip -r ../../infra/nodejs.zip ./nodejs

echo "Cleaning up..."
rm -rf node_modules/
rm -rf nodejs/
cd ../../infra