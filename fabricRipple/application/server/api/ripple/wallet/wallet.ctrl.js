const request = require('sync-request');
const QRcode = require('qrcode');
const rippleApiIp = 'http://158.247.224.241:7777';

/**
 * 이름: index
 * 설명: 리플 계좌 정보 조회
 * 입력
 *  - account: 계좌번호
 * */
const index = function(req, res) {
    /* 필수 입력값{account} 확인 */
    const account = req.query.account;      // 계좌번호
    if (!account) {
        console.log('계좌번호를 전달 받지 못함');
        return res.status(400)
                  .send('계좌번호를 전달 받지 못함');

    };


    /* 요청 url 세팅 */
    const url = rippleApiIp.concat('/wallet')
                           .concat('?account=')
                           .concat(account);
    console.log('요청 url: ' + url);


    /* 리플 계좌정보 조회 API 호출 */
    const response = request('GET', url, {
        headers: {
            'user-agent': 'test',
        },
    });


    /* 조회 결과값 */
    console.log('GET /ripple/wallet?account=%s 응답 메시지', account);
    console.log(response.getBody().toString());
    return res.send(response.getBody().toString());
};



/**
 * 이름: qrcode
 * 설명: 리플 계좌번호 qrcode 생성
 * 입력
 *  - account: 계좌번호
 * 출력
 *  - qrcode url(수정될 예정)
 * */
const qrcode = function(req, res) {
    const address = req.query.address;

    // 계좌번호를 전달 받지 못한 경우
    if (!address) {
        console.log('계좌번호를 전달 받지 못함');
        return res.status(400)
            .send('계좌번호를 전달 받지 못함');
    };

    QRcode.toDataURL(address, function (err, url) {
        console.log(url);
        return res.send(url);
    });
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
    /* 필수 입력값{account, secret, amount, destination} 체크 */
    const account = req.query.account;              // 발신 계좌번호
    const secret = req.query.secret;                // 비밀키
    const amount = req.query.amount;                // 송금액
    const destination = req.query.destination;      // 수신 계좌번호


    /* 요청 url 세팅 */
    const url = rippleApiIp.concat('/wallet').concat('/transfer')
                           .concat('?account=').concat(account)
                           .concat('&secret=').concat(secret)
                           .concat('&amount=').concat(amount)
                           .concat('&destination=').concat(destination);
    console.log('요청 url: ' + url);


    /* 리플 계좌 송금 API 호출 */
    const response = request('GET', url, {
        headers: {
            'user-agent': 'test',
        },
    });


    /* 송금 결과값 */
    console.log('GET /wallet/transfer?account=%s&secret=%s&amount=%s&destination=%s 응답 메시지', account, secret, amount, destination);
    console.log(response.getBody().toString());
    return res.send(response.getBody().toString());
};


module.exports = { index, qrcode, transfer };