const request = require('sync-request');

const index = function(req, res) {
    const address = req.query.address;

    // 계좌번호를 전달 받지 못한 경우
    if (!address) {
        console.log('계좌번호를 전달 받지 못함');
        return res.status(400)
                  .send('계좌번호를 전달 받지 못함');

    }

    const url = 'http://158.247.224.241:7777/wallet'
                    .concat('?address=').concat(address);
    console.log('요청 url: ' + url);

    // 리플 계좌정보 조회 API 호출
    const response = request('GET', url, {
        headers: {
            'user-agent': 'test',
        },
    });

    console.log('조회 결과값 확인\n' + response.getBody());
    return res.send("{\"accountAddress\":\""
                        .concat(address)
                        .concat("\"},")
                        .concat(response.getBody()));
};

module.exports = { index };