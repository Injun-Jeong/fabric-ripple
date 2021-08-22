const firestore = require('../../db/fbase');
const usersRef = firestore.collection('users');

/**
 * 이름: getUser
 * 설명: 유저 정보 조회
 * 입력
 *  - id: 유저 ID
 */
const getUser = async function(req, res) {
    console.log('users.ctrl.getUser 유저 정보 조회 메서드 시작');
    const userId = req.params.userId;
    if (!userId)  return res.status(400).end();

    let snapshot = Object;
    /* 유저 정보 조회 */
    try {
        snapshot = await usersRef.where('userId', '==', userId).get();
    } catch (e) {
        return res.status(500).end();
    };

    /* 조회 결과값 확인 */
    if (snapshot.empty) {
        console.log('no such user id: %s', userId);
        return res.status(404).end();
    } else {
        let queryData = [];
        snapshot.forEach(doc => { queryData.push(doc.data()); })
        console.log('유저 조회 결과');
        console.log(queryData[0]);
        return res.status(200).json(queryData[0]);
    };
};



/**
 * 이름: createUser
 * 설명: 유저 정보 생성
 * 입력
 *  - userId
 *  - pw
 *  - nation
 *  - firstName
 *  - lastName
 *  - account
 *  - rippleAccount
 */
const createUser = async function(req, res) {
    console.log('users.ctrl.createUser 유저 정보 생성 메서드 시작');
    /* 입력 받은 유저 정보 세팅 */
    const userInfo = {
        userId: req.body.userId,
        pw: req.body.pw,
        nation: req.body.nation,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        account: req.body.account,
        rippleAccount: req.body.rippleAccount,
        createAt: Date.now(),
    };

    /* 중복된 유저 id 존재 확인 */
    const isConflict = await usersRef.where('userId', '==', req.body.userId).get();
    if (isConflict) return res.status(409).end();

    /* 유저 정보 database 등록 */
    try {
        //await usersRef.doc('유저문서채번 메서드 구현 후 사용').set(userInfo);
        await usersRef.add(userInfo);
        console.log('유저 생성 결과');
        console.log(userInfo);
        return res.status(201).json(userInfo);
    } catch(e) {
        console.log('새로운 유저 정보 database 등록 중, 오류가 발생하였습니다.');
        return res.status(500).end();
    }
};



/**
 * 이름: modifyUser
 * 설명: 유저 정보 수정
 * 입력
 *  -
 */
const modifyUser = function(req, res) {
    return res.send('modify user');
}



/**
 * 이름: deleteUser
 * 설명: 유저 제거
 * 입력
 *  -
 */
const deleteUser = function(req, res) {
    return res.send('delete user');
}



module.exports = { getUser, createUser, modifyUser, deleteUser };

