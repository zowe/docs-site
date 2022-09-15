#!/bin/bash
# Usage: bash scripts/updateTypedoc.sh <zoweVersion> [<outputDir>]

set -e
ZOWE_VERSION=$1
OUTPUT_DIR=$2

# Navigate to output directory
if [ -z "$OUTPUT_DIR" ]; then
  baseDir=$(dirname "$0")/..
  OUTPUT_DIR=$baseDir/static/$(echo v$ZOWE_VERSION | sed 's/.$/x/')
  if ! grep -q $(basename "$OUTPUT_DIR") "$baseDir/versions.json"; then
    OUTPUT_DIR=$(dirname "$OUTPUT_DIR")/stable
  fi
fi
cd $OUTPUT_DIR

# Clean up old files
rm -rf typedoc
rm -f zowe-nodejs-sdk-typedoc.zip

# Download and extract new files
curl -L -o zowe-nodejs-sdk-typedoc.zip https://zowe.jfrog.io/artifactory/libs-release-local/org/zowe/sdk/zowe-nodejs-sdk/$ZOWE_VERSION/zowe-nodejs-sdk-typedoc-$ZOWE_VERSION-RC1.zip
unzip zowe-nodejs-sdk-typedoc.zip

# Stage changes in Git
git add -A .
