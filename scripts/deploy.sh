#!/bin/bash
REPOSITORY=/home/ubuntu/nft-collections-front

cd $REPOSITORY
sudo pm2 start npm --name nft-collections-front -- start
