#!/bin/bash
REPOSITORY=/home/ubuntu/nft-collections-front

cd $REPOSITORY
npm install pm2 -g
pm2 start npm --name nft-collections-front -- start
