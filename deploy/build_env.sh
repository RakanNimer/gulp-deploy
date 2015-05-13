#!/bin/sh

apt-get update
apt-get -y upgrade
apt-get install -y git 
apt-get install -y nodejs
apt-get install -y npm
ln -s  /usr/bin/nodejs  /usr/bin/node
npm install -g pm2
npm install -g gulp
#Mongo Install
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
apt-get update
apt-get install -y mongodb-org
## Mongo installed
mkdir -p $1
git clone https://github.com/RakanNimer/gulp-deploy $1 
cd $1
git checkout $2
git pull origin $2
npm install && gulp start-production
