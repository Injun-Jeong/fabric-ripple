#!/bin/sh

# create cryptogen file into 'crypto-config' folder
rm -rf crypto-config
mkdir crypto-config
./bin/cryptogen generate --config=./crypto-config.yaml

echo ''
echo '====================================================='
echo '===   Success cryptogen. check [crypto-config] folder'
echo '====================================================='
echo ''


# create transaction file into 'config' folder
rm -rf config
mkdir config
./bin/configtxgen -profile OrdererGenesis -outputBlock ./config/genesis.block
./bin/configtxgen -profile ChannelKorea -outputCreateChannelTx ./config/channelKorea.tx -channelID channelKorea
./bin/configtxgen -profile ChannelUSA -outputCreateChannelTx ./config/channelUSA.tx -channelID channelUSA

./bin/configtxgen -profile ChannelKorea -outputAnchorPeersUpdate ./config/KoreaOrgAnchors.tx -channelID channelKorea -asOrg KoreaOrg
./bin/configtxgen -profile ChannelUSA -outputAnchorPeersUpdate ./config/USAOrgAnchors.tx -channelID channelUSA -asOrg USAOrg
./bin/configtxgen -profile ChannelKorea -outputAnchorPeersUpdate ./config/CustomerOrgAnchorsChannelKorea.tx -channelID channelKorea -asOrg CustomerOrg
./bin/configtxgen -profile ChannelUSA -outputAnchorPeersUpdate ./config/CustomerOrgAnchorsChannelUSA.tx -channelID channelUSA -asOrg CustomerOrg

echo ''
echo '========================================================'
echo '===   Success to create the info transaction of channel.'
echo '===   Check [config] folder'
echo '========================================================'
echo ''