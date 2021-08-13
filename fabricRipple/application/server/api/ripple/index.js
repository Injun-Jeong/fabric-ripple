const express = require('express')
const wallet = require('./wallet/wallet.ctrl')
const router = express.Router();

/* 리플 계좌 조회 */
router.get('/wallet', wallet.index);

/* 리플 계좌번호 QR code 조회 */
router.get('/wallet/qrcode', wallet.qrcode);

/* 리플 계좌 송금 */
router.get('/wallet/transfer', wallet.transfer);

module.exports = router;