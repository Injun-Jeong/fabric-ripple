const express = require('express');
const wallet = require('./wallet.ctrl');
const ripple = require('./ripple/ripple.ctrl');
const router = express.Router();


/* 지갑 정보 조회 */
router.get('/', wallet.index);

/* 계좌 송금 */
router.get('/transfer', wallet.transfer);

/* 계좌번호 QR code 생성 */
router.get('/qrcode', wallet.genQrcode);




/* 리플 계좌 정보 조회 */
router.get('/ripple', ripple.index);

/* 리플 계좌 송금 */
router.get('/ripple/transfer', ripple.transfer);

module.exports = router;