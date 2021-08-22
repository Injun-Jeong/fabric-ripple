const express = require('express');
const wallets = require('./wallets.ctrl');
const ripple = require('./ripple/ripple.ctrl');
const router = express.Router();


/* 지갑 정보 조회 */
router.get('/:account', wallets.getWallet);

/* 계좌번호 QR code 조회 */
router.get('/qrcode-account/:account', wallets.getQrcode);

/* 계좌 송금 */
router.put('/transfer', wallets.transfer);





/* 리플 계좌 정보 조회 */
router.get('/ripple/:account', ripple.getWallet);

/* 리플 계좌 송금 */
router.put('/ripple/transfer', ripple.transfer);

module.exports = router;