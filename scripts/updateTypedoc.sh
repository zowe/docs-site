#!/bin/bash
# Usage: bash scripts/updateTypedoc.sh <zoweVersion>

set -e
ZOWE_VERSION=$1

# Navigate to static directory
cd "$(dirname "$0")"
cd ../static/$(echo v$ZOWE_VERSION | sed 's/.$/x/')

# Clean up old files
rm -rf typedoc
rm -f zowe-nodejs-sdk-typedoc.zip

# Download and extract new files
curl -L -o zowe-nodejs-sdk-typedoc.zip https://zowe.jfrog.io/artifactory/libs-release-local/org/zowe/sdk/zowe-nodejs-sdk/$ZOWE_VERSION/zowe-nodejs-sdk-typedoc-$ZOWE_VERSION-RC1.zip
unzip zowe-nodejs-sdk-typedoc.zip

# Stage changes in Git
git add -A .
