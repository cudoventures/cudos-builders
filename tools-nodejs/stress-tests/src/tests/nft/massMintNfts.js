import { mintNftMsg } from '../../cudos/msgs';
import { checkTx, constants, getSigner } from '../../cudos/cudosUtils.js';
import wait from '../../utils/wait.js';
import { logError, logGeneral } from '../../utils/logger.js';
import { cosmos } from '../../../cosmos/proto';

const BLOCKS_TO_WAIT = 1;
const testName = 'NFT_MASS_MINT: ';
const N_TESTS = 20000;
const N_NFTs = 500;
const GAS_LIMIT = constants.GAS_LIMITS.NFT_MINT;

export default async function runTest(baseConfig) {
    // setup
    const TIME = BLOCKS_TO_WAIT * baseConfig.blockTime;

    const baseProvider = baseConfig.providers[0];
    const faucetAddress = baseProvider.getAddress(baseConfig.faucetMnemonic);
    let signer = await getSigner(baseProvider, baseConfig.faucetMnemonic);

    //start test
    const txs = [];
    for (let i = 1; i <= N_TESTS; i++) {
        logGeneral(testName + `Minting batch of NFTs N: ${i}`);
        const msgs = [];

        for (let j = 0; j < N_NFTs; j++) {
            msgs.push(mintNftMsg({
                denomId: 'test',
                name: 't'.repeat(1+ j%255),
                uri: 't'.repeat(1+ i%255),
                data: 'd'.repeat(1+ j+i%255),
                sender: faucetAddress,
                recipient: faucetAddress,
            }))
        }
        //send tx
        const txBody = new cosmos.tx.v1beta1.TxBody({ messages: msgs, memo: "MASS NFT MINT TEST" });

        // --------------------------------- feeValue ---------------------------------
        const totalGasLimit = GAS_LIMIT.mul(msgs.length);
        const feeValue = new cosmos.tx.v1beta1.Fee({
            amount: [{
                denom: constants.GAS_DENOM,
                amount: totalGasLimit.mul(signer.provider.gasPrice).toString()
            }],
            gas_limit: totalGasLimit.toString(),
        });

        // --------------------------------- authInfo ---------------------------------
        const signerInfo = new cosmos.tx.v1beta1.SignerInfo({
            public_key: signer.pubKey,
            mode_info: {
                single: {
                    mode: cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT
                }
            },
            sequence: signer.account.sequence
        });

        const authInfo = new cosmos.tx.v1beta1.AuthInfo({
            signer_infos: [signerInfo],
            fee: feeValue
        });

        // -------------------------------- sign --------------------------------

        const signedTxBytes = signer.provider.sign(txBody, authInfo, signer.account.account_number, signer.privKey);
        const txRes = await signer.provider.broadcast(signedTxBytes);

        // txs.push(await txRes);
        signer.account.sequence++;
    }

    // logGeneral(testName + 'Checking transactions...');

    // for (let txResp of txs) {
    //     if(i%25 === 0){
    //         await wait(1, "");
    //     }
    //     const txRes = await txResp;
    //     console.log(txRes);
    //     checkTx(baseProvider.url, txRes.tx_response);
    //     console.log(txRes.tx_response.txhash);
    //     await wait(0.1, "");
    // }

};