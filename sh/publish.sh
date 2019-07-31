#!/bin/bash
set -e
# sh/publish.sh <remix name> <"--production">
# publish the current version of this remix to npm

git checkout $1
commit=$(git rev-parse --short HEAD)
git checkout $commit
npm ci
npm run rollup

echo "publishing remix $1"

if [[ $2 != "--production" ]]; then
  echo "versioning as prerelease"
  npm version prerelease --preid=$commit
fi

npm publish
git checkout $1
