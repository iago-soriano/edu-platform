#!/bin/bash
set -e
CONFIG_PATH="./scripts/config.sh"

BUILD_FUNCTION_PATH="./scripts/function/build.sh"
DEPLOY_FUNCTION_PATH="./scripts/function/deploy.sh"

BUILD_DEPENDENCIES_PATH="./scripts/dependencies/build.sh"
DEPLOY_DEPENDENCIES_PATH="./scripts/dependencies/deploy.sh"

source "$CONFIG_PATH"

deploy_dependencies() {
    read -p "Current dependencies version is $DEPENDENCIES_VERSION. What is the new version? " DEPENDENCIES_VERSION
    echo "Starting deploy of dependencies version $DEPENDENCIES_VERSION..."
    # source "$BUILD_DEPENDENCIES_PATH"
    # source "$DEPLOY_DEPENDENCIES_PATH"
}

deploy_function() {
    read -p "Versão atual da função é $FUNCTION_VERSION. Qual será a nova versão? " FUNCTION_VERSION    
    echo "Starting deploy of function version $FUNCTION_VERSION..."
    # source "$BUILD_FUNCTION_PATH"
    source "$DEPLOY_FUNCTION_PATH"
}

overwrite_current_versions() {
    echo "DEPENDENCIES_VERSION=\"$DEPENDENCIES_VERSION\"" > $CONFIG_PATH
    echo "FUNCTION_VERSION=\"$FUNCTION_VERSION\"" >> $CONFIG_PATH
}


read -p "Would you like to deploy a new node_modules? [y/N] " input
deployDependencies=${input:-N} 

if [ $deployDependencies == "y" ];
then
    deploy_dependencies
    deploy_function
else
    echo "node_modules deploy skipped"
    deploy_function
fi

overwrite_current_versions


