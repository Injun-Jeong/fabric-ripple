#!/bin/sh

# install git
sudo apt update
sudo apt install git
git --version


# install python
sudo apt install python -y
python --version


# install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

echo ''
echo 'node -v'
node -v

echo ''
echo 'npm -v'
npm -v
