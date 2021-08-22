const qrcode = require('qrcode');
const fabricSdk = require('../fabric.sdk');

/**
 * 이름: getWallet
 * 설명: 지갑 정보 조회
 * 입력
 *  - account       계좌번호
 *  - walletUser    지갑 사용자
 *  - channelId     채널 ID
 *  - chaincode     체인코드 이름
 * 출력
 *  -
 */
const getWallet = function(req, res) {
    const account = req.params.account;
    let args = [account];

    const invokeYn = false;
    /*
    const walletUser = req.body.walletUser;
    const channelId = req.body.channelId;      // { channelkorea, channelusa }
    const chaincode = req.body.chaincode;
     */
    const walletUser = 'user1';
    const channelId = 'channelkorea';      // { channelkorea, channelusa }
    const chaincode = 'cc-exchange-korea';

    let txInfo = [invokeYn, walletUser, channelId, chaincode]

    /* 지갑 정보 조회 체인코드 호출 */
    fabricSdk.send(txInfo, 'getWallet', args, res);
}



/**
 * 이름: getQrcode
 * 설명: 계좌번호 qrcode 조회
 * 입력
 *  - account: 계좌번호
 * 출력
 *  - qrcode url(수정될 예정)
 * */
const getQrcode = function(req, res) {
    const account = req.params.account;

    // 계좌번호를 전달 받지 못한 경우
    if (!account) {
        console.log('계좌번호를 전달 받지 못함');
        return res.status(400).end();
    };

    console.log('qrcode 생성 시작');
    qrcode.toDataURL(account, function (err, url) {
        console.log(url);
        return res.json(url);
    });
};



/**
 * 이름: transfer
 * 설명: 송금
 * 입력
 *  - account       계좌번호
 *  - destination   수신 계좌번호
 *  - amount        금액
 *  - walletUser    지갑 사용자
 *  - channelId     채널 ID
 *  - chaincode     체인코드 이름
 * 출력
 *  -
 */
const transfer = function(req, res) {
    const account = req.body.account;
    const destination = req.body.destination;
    const amount = req.body.amount;
    let args = [account, destination, amount];

    /* todo: transaction info 설정 방법 */
    const invokeYn = true;
    /*
    const walletUser = req.body.walletUser;
    const channelId = req.body.channelId;      // { channelkorea, channelusa }
    const chaincode = req.body.chaincode;
     */
    const walletUser = 'user1';
    const channelId = 'channelkorea';      // { channelkorea, channelusa }
    const chaincode = 'cc-exchange-korea';
    let txInfo = [invokeYn, walletUser, channelId, chaincode]

    // 송금 체인코드 호출
    fabricSdk.send(txInfo, 'transfer', args, res);
}

module.exports = { getWallet, getQrcode, transfer };