'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, '../..', 'connection.json');


/**
 * 이름: send
 * 설명: fabric network 체인코드 호출
 * @param txInfo: 트랜잭션 설정 정보[invoke 호출여부, Wallet User ID, Channel ID, Chaincode name]
 * @param func: 호출 체인코드 함수
 * @param args: 호출 체인코드 인자
 * @param res
 */
async function send(txInfo, func, args, res) {
    try {
        const type = txInfo[0];         // invoke 호출 여부
        const walletUser = txInfo[1];   // Wallet User ID
        const channelId = txInfo[2];    // Channel ID
        const chaincode = txInfo[3];    // Chaincode name

        const walletPath = path.join(process.cwd(), '..', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const userExists = await wallet.exists(walletUser);
        if (!userExists) {
            console.log(`An identity for the user ${walletUser} does not exist in the wallet`);
            console.log('Run the registerUser.js application before retrying');
            return ;
        }

        const gateway = new Gateway();
        await gateway.connect(ccpPath, { wallet, identity: walletUser, discovery: { enabled: true, asLocalhost: true } });
        const network = await gateway.getNetwork(channelId);
        const contract = network.getContract(chaincode);

        if (type) {
            // invoke 함수 호출
            await contract.submitTransaction(func, ...args);
            console.log('Transaction has been submitted');
            await gateway.disconnect();
            res.send('Transaction has been submitted');
        } else {
            // query 함수 호출
            const result = await contract.evaluateTransaction(func, ...args);
            console.log(`Transaction has been evaluated, result is: ${result}`);
            res.status(200).send(JSON.parse(result.toString())[0]);
        }

    } catch(error) {
        console.error(`Failed to submit transaction: ${error}`);
        res.send(`Failed to submit transaction: ${error}`);
    }
}

module.exports = { send }