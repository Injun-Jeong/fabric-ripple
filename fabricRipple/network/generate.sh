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
# 생성되는 트랜잭션 파일의 이름과 채널 ID를 다르게 해주어야 한다.
# 그리고 채널 ID로는 대문자가 불가능한 것으로 보인다
# 즉, channelKorea 가 아닌 channelkorea로 해야 한다.
./bin/configtxgen -profile ChannelKorea -outputCreateChannelTx ./config/korea.tx -channelID channelkorea
./bin/configtxgen -profile ChannelUSA -outputCreateChannelTx ./config/usa.tx -channelID channelusa

./bin/configtxgen -profile ChannelKorea -outputAnchorPeersUpdate ./config/KoreaOrgAnchors.tx -channelID channelkorea -asOrg KoreaOrg
./bin/configtxgen -profile ChannelUSA -outputAnchorPeersUpdate ./config/USAOrgAnchors.tx -channelID channelusa -asOrg USAOrg
./bin/configtxgen -profile ChannelKorea -outputAnchorPeersUpdate ./config/CustomerOrgAnchorsChannelKorea.tx -channelID channelkorea -asOrg CustomerOrg
./bin/configtxgen -profile ChannelUSA -outputAnchorPeersUpdate ./config/CustomerOrgAnchorsChannelUSA.tx -channelID channelusa -asOrg CustomerOrg

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