// 기본적인 라우팅 설정 로직
const express = require('express')
const wallet = require('./wallet/wallet.ctrl')
const router = express.Router();

router.get('/wallet', wallet.index);

module.exports = router;