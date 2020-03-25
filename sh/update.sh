#!/bin/bash
# Updates the existing local and origin branches corresponding to the remix
# pass an argument if you want to pull a different branch name than the current branch you're on
# no argument needed to update against the branch name of the current branch

# branch to use is the first argument, but if the first argument was not passed, use the current git branch
branchToUse="$1" && [[  -z "$1" ]]  && branchToUse="$(git rev-parse --abbrev-ref HEAD)"

git checkout $branchToUse
git pull $branchToUse master
git push origin $branchToUse