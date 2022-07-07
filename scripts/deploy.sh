#!/bin/bash
REPOSITORY=/home/ubuntu/nft-collections-front

cd $REPOSITORY
/home/ubuntu/.nvm/versions/node/v16.14.2/bin/npm install pm2 -g
/home/ubuntu/.nvm/versions/node/v16.14.2/bin/pm2 start npm --name nft-collections-front -- start
