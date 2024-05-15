#!/bin/bash
# Usage: bash scripts/optimizeGifs.sh <inputDir>

if ! which gifsicle; then
  echo "This script requires 'gifsicle' to be installed and on the PATH"
  exit 1
fi

for gif in $(find $1 -name '*.gif'); do
  gifsicle -b -O3 $gif
done
