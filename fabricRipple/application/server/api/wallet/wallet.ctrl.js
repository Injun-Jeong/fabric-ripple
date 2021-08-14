const QRcode = require('qrcode');

/**
 * 이름:
 * 설명:
 * 입력
 *  -
 * 출력
 *  -
 */
const index = function(req, res) {
    return res.send("");
}

/**
 * 이름:
 * 설명:
 * 입력
 *  -
 * 출력
 *  -
 */
const transfer = function(req, res) {
    return res.send("");
}


/**
 * 이름: genQrcode
 * 설명: 계좌번호 qrcode 생성
 * 입력
 *  - account: 계좌번호
 * 출력
 *  - qrcode url(수정될 예정)
 * */
const genQrcode = function(req, res) {
    const account = req.query.account;

    // 계좌번호를 전달 받지 못한 경우
    if (!account) {
        console.log('계좌번호를 전달 받지 못함');
        return res.status(400)
            .send('계좌번호를 전달 받지 못함');
    };

    console.log('qrcode 생성 시작');
    QRcode.toDataURL(account, function (err, url) {
        console.log(url);
        return res.send(url);
    });
};

module.exports = { index, transfer, genQrcode };