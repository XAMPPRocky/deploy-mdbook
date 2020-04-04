#!/usr/bin/env bash

npm run all

git clone "git@github.com:$REPO.git" ../repo

GITHUB_WORKSPACE=../repo \
INPUT_TOKEN=$GITHUB_TOKEN \
INPUT_GITHUB_TOKEN=$GITHUB_TOKEN \
DEBUG_DEPLOY_ACTION=1 \
INPUT_REPOSITORY=$REPO \
node lib/main.js

# rm -rf ../repo
