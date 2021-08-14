const express = require('express');
const user = require('./user.ctrl');
const router = express.Router();

// 유저 정보 조회
router.get('/', user.getUser);

// 유저 정보 생성
router.get('/create', user.createUser);

// 유저 정보 변경
router.get('/modify', user.modifyUser);

// 유저 정보 제거
router.get('/delete', user.deleteUser);

module.exports = router;