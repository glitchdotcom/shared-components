#!/bin/bash
# Updates the existing local and origin branches corresponding to the remix

git checkout $1
git pull $1 master
git push origin $1