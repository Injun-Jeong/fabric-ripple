const firestore = require('../../db/fbase');
const usersRef = firestore.collection('users');

/**
 * 이름: getUser
 * 설명: 유저 정보 조회
 * 입력
 *  - id: 유저 ID
 * 출력
 *  -
 */
const getUser = async function(req, res) {
    const snapshot = await usersRef.where('id', '==', req.query.id)
                                   .get();
    if (snapshot.empty) {
        console.log('no such user id: %s', req.query.id);
        return res.send('조회된 유저가 없습니다.');
    } else {
        let queryData = [];
        snapshot.forEach(doc => { queryData.push(doc.data()); })
        console.log('유저 조회 결과');
        console.log(queryData);
        return res.send(queryData);
    }
};



/**
 * 이름: createUser
 * 설명: 유저 정보 생성
 * 입력
 *  -
 * 출력
 *  - id: 유저 ID
 */
const createUser = async function(req, res) {
    const userInfo = {
        id: req.query.id,
        pw: req.query.pw,
        nation: req.query.nation,
        first_name: req.query.first_name,
        last_name: req.query.last_name,
        account: req.query.account,
        ripple_account: req.query.ripple_account,
        createAt: Date.now(),
    };

    //await usersRef.doc('유저문서채번 메서드 구현 후 사용').set(userInfo);
    try {
        await usersRef.add(userInfo);
        console.log('유저 생성 결과');
        console.log(userInfo);
        return res.send(userInfo);
    } catch(e) {
        return res.send('유저 생성 중, 오류가 발생하였습니다. 다시 시도해주세요.');
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

