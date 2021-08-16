#!/bin/sh

cd $GOPATH/src

# install hyperledger fabric
# curl -sSL http://bit.ly/2ysbOFE | bash -s -- <fabric_version> <fabric-ca_version> <thirdparty_version>
curl -sSL http://bit.ly/2ysbOFE | bash -s -- 1.4.3 1.4.3 0.4.15


# for go(chaincode) building
mkdir -p $GOPATH/src/github.com/hyperledger/
cd $GOPATH/src/github.com/hyperledger/
git clone -b release-1.4 https://github.com/hyperledger/fabric.git
go env -w GO111MODULE=auto
apt-get install build-essential
