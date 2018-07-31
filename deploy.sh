#!/usr/bin/env sh

# abort on errors
set -e

npm run docs:build

cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.ibm.com:Adam-Battenburg/zoe-quick-start.git master:gh-pages

cd -