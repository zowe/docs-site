#!/bin/bash
# Usage: bash scripts/updateWebHelp.sh <zoweVersion>

set -e
ZOWE_VERSION=$1

# Navigate to static directory
cd "$(dirname "$0")"
cd ../static/$(echo v$ZOWE_VERSION | sed 's/.$/x/')

# Clean up old files
rm -rf web_help
rm -f CLIReference_Zowe.pdf
rm -f zowe_web_help.zip

# Download and extract new files
curl -L -o zowe_web_help.zip https://github.com/zowe/zowe-cli-web-help-generator/releases/download/v$ZOWE_VERSION/zowe-v$ZOWE_VERSION-WebHelp.zip
curl -L -o CLIReference_Zowe.pdf https://github.com/zowe/zowe-cli-web-help-generator/releases/download/v$ZOWE_VERSION/zowe-v$ZOWE_VERSION.pdf
unzip zowe_web_help.zip
mv zowe-v$ZOWE_VERSION-WebHelp web_help

# Stage changes in Git
git add -A .
