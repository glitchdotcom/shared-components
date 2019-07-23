#!/bin/bash
# Updates the local master branch with origin/master, merges it with the latest 
# from the production glitch app, and then pushes that back up to origin/master

git checkout master
git pull
git pull live master
git push origin master

