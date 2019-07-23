#!/bin/bash
# Creates a remote corresponding to the passed-in remix name, pulls from it to a
# new local branch, and pushes that branch up to the origin repo

git remote add $1 https://api.glitch.com/git/$1
git fetch $1 master:$1
git checkout $1
git push origin $1

