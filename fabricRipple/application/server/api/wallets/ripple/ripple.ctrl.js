const request = require('sync-request');
const rippleApiPath = 'http://158.247.224.241:7777';

/**
 * 이름: getWallet
 * 설명: 리플 계좌 정보 조회
 * 입력
 *  - account: 계좌번호
 * 출력
 *  - 리플 계좌 정보
 * */
const getWallet = function(req, res) {
    /* 필수 입력값{account} 확인 */
    const account = req.params.account;      // 계좌번호
    if (!account) {
        console.log('계좌번호를 전달 받지 못함');
        return res.status(400).end();
    };

    /* 요청 url 세팅 */
    const url = rippleApiPath.concat('/wallets/')
                             .concat(account);
    console.log('요청 url: ' + url);

    /* 리플 계좌정보 조회 API 호출 */
    const response = request('GET', url, {
        headers: {
            'user-agent': 'fabric ripple',
        },
    });

    /* 조회 결과값 */
    console.log('GET /wallets/ripple/%s 응답 메시지', account);
    console.log(response.getBody().toString());
    return res.json(response.getBody().toString());
};



/**
 * 이름: transfer
 * 설명: 리플 계좌 송금
 * 입력
 *  - account: 발신 계좌번호
 *  - secret: 비밀키
 *  - amount: 송금액
 *  - destination: 수신 계좌번호
 * */
const transfer = function(req, res) {
    const body = {
        account: req.body.account,              // 발신 계좌번호
        secret: req.body.secret,                // 비밀키
        amount: req.body.amount,                // 송금액
        destination: req.body.destination       // 수신 계좌번호
    }

    /* 요청 url 세팅 */
    const url = rippleApiPath.concat('/wallets/transfer');
    console.log('요청 url: ' + url);
    console.log('요청 body: ' + body);

    /* 리플 계좌 송금 API 호출 */
    const response = request('PUT', url, {
        json: body
    });

    /* 송금 결과값 */
    console.log('PUT /wallets/ripple/transfer 응답 메시지');
    console.log(response.getBody().toString());
    return res.send(response.getBody().toString());
};


module.exports = { getWallet, transfer };