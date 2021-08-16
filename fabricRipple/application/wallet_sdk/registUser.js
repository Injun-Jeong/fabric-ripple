'use strict'

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', 'connection.json');

async function main() {
    try {
        if (process.argv.length != 3) {
            console.log('Incorrect number of arguments. Expecting 3: node registUser userId');
            return;
        }
        const userId = process.argv[2];


        const walletPath = path.join(process.cwd(), '..', 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        const userExists = await wallet.exists(userId);
        if (userExists) {
            console.log(`An identity for the user ${userId} already exists in the wallet`);
            return;
        }

        const adminExsists = await wallet.exists('admin');
        if (!adminExsists) {
            console.log('An identity for the admin user "admin" does not exist in the wallet');
            console.log('Run the enrollAdmin.js application before retrying');
            return ;
        }

        const gateway = new Gateway();
        await gateway.connect( ccpPath, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } } );
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();
        const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: userId, role: 'client' }, adminIdentity);
        const enrollment = await ca.enroll({enrollmentID: userId, enrollmentSecret: secret});
        const userIdentity = X509WalletMixin.createIdentity('KoreaOrg', enrollment.certificate, enrollment.key.toBytes());

        await wallet.import(userId, userIdentity);
        console.log(`Successfully registered and enrolled admin user ${userId} and imported it into the wallet`);
    } catch (error) {
        console.log(`Failed to register user ${userId}: ${error}`);
        process.exit(1);
    }
}

main();
