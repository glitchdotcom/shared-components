#!/bin/bash
# sh/publish.sh <remix name> <"--production">
# publish the current version of this remix to npm

git checkout $1
local commit = $(git rev-parse --short HEAD)
npm ci
npm run rollup

if [[$2 != "--production"]]; then
  npm version prerelease --preid=$commit
fi
npm publish
git checkout $1
