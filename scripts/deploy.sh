#!/bin/bash
REPOSITORY=/home/ubuntu/nft-collections-front

cd $REPOSITORY
pm2 start npm --name nft-collections-front -- start
