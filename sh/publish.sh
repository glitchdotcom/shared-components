#!/usr/bin/env bash
set -euo pipefail
# sh/publish.sh <remix name> <"--rc" | "--production">
# publish the current version of this remix to npm

git checkout $1
git pull $1 master

if [[ $2 == "--rc" ]]; then
  echo "publishing $1 release candidate"
  commit=$(git rev-parse --short HEAD)
  git checkout $commit
  npm version prerelease --preid=$commit
  npm ci
  npm publish
  git checkout $1
elif [[ $2 == "--production" ]]; then
  echo "publishing $1 production release"
  npm ci
  npm run check-changelog
  npm publish
fi
