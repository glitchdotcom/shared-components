#!/usr/bin/env bash
set -euo pipefail
# sh/publish.sh <"--rc" | "--production">
# publish the current branch to npm

if [[ $1 == "--rc" ]]; then
  echo "publishing release candidate"
  commit=$(git rev-parse --short HEAD)
  git checkout $commit
  npm version prerelease --preid=$commit
  npm ci
  npm publish
elif [[ $1 == "--production" ]]; then
  echo "publishing production release"
  npm ci
  npm run check-changelog
  npm publish
fi
