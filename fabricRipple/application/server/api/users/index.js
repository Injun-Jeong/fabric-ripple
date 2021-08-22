const express = require('express');
const users = require('./users.ctrl');
const router = express.Router();

// 유저 정보 생성
router.post('/', users.createUser);

// 유저 정보 조회
router.get('/:userId', users.getUser);

// 유저 정보 변경
router.put('/:userId', users.modifyUser);

// 유저 정보 제거
router.delete('/:userId', users.deleteUser);

module.exports = router;