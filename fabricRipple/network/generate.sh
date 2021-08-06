#!/bin/sh

# remove previouse data and container
rm -rf crypto-config
rm -rf config
CONTAINER_IDS=$(docker ps -aq)
docker stop $CONTAINER_IDS
docker rm $CONTAINER_IDS
docker volume prune

echo ''
echo '==========================================================='
echo '===   Delete previouse data and container'
echo '==========================================================='
echo ''


# create cryptogen file into 'crypto-config' folder
mkdir crypto-config
./bin/cryptogen generate --config=./crypto-config.yaml

echo ''
echo '==========================================================='
echo '===   Success cryptogen. check [crypto-config] folder'
echo '==========================================================='
echo ''


# create transaction file into 'config' folder
mkdir config
./bin/configtxgen -profile OrdererGenesis -outputBlock ./config/genesis.block
./bin/configtxgen -profile ChannelKorea -outputCreateChannelTx ./config/channelKorea.tx -channelID channelKorea
./bin/configtxgen -profile ChannelUSA -outputCreateChannelTx ./config/channelUSA.tx -channelID channelUSA

./bin/configtxgen -profile ChannelKorea -outputAnchorPeersUpdate ./config/KoreaOrgAnchors.tx -channelID channelKorea -asOrg KoreaOrg
./bin/configtxgen -profile ChannelUSA -outputAnchorPeersUpdate ./config/USAOrgAnchors.tx -channelID channelUSA -asOrg USAOrg
./bin/configtxgen -profile ChannelKorea -outputAnchorPeersUpdate ./config/CustomerOrgAnchorsChannelKorea.tx -channelID channelKorea -asOrg CustomerOrg
./bin/configtxgen -profile ChannelUSA -outputAnchorPeersUpdate ./config/CustomerOrgAnchorsChannelUSA.tx -channelID channelUSA -asOrg CustomerOrg

echo ''
echo '==========================================================='
echo '===   Success to create the info transaction of channel.'
echo '===   Check [config] folder'
echo '==========================================================='
echo ''


# run container
echo ''
echo '==========================================================='
echo '===   Start docker-compose to run container'
echo '==========================================================='
docker-compose up -d