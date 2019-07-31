#!/bin/bash
# sh/publish.sh <remix name> <"--production">
# publish the current version of this remix to npm

git checkout $1
npm ci
npm run rollup

if [$2 == ]
npm version prerelease --preid=$(git rev-parse --short HEAD)
