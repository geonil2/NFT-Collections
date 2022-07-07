#!/bin/bash
REPOSITORY=/home/ubuntu/nft-collections-front

cd $REPOSITORY
rm -rf node_modules
npm install
npm run build
pm2 reload 0

