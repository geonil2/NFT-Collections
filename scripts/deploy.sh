#!/bin/bash
REPOSITORY=/home/ubuntu/nft-collections-front

cd $REPOSITORY
pm2 install pm2 -g
pm2 start npm --name nft-collections-api -- start
