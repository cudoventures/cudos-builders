import { constants } from './cudosUtils.js';
import { cosmos } from '../../cosmos/proto';

export default async function sendTx(signer, msgType, args, gasLimit) {
    args.fromAddress = signer.account.address;

    const msgs = [];
    for (let address of args.destinationAddresses) {
        args.toAddress = address;
        const msg = msgType(args)
        msgs.push(msg);
    }

    const txBody = new cosmos.tx.v1beta1.TxBody({ messages: msgs, memo: "STRESS TEST" });

    // --------------------------------- feeValue ---------------------------------
    const totalGasLimit = gasLimit.mul(msgs.length);
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
    const txRes = (await signer.provider.broadcast(signedTxBytes)).tx_response;


    if(txRes.code != 0){
        throw new Error(`code ${txRes.code}: ${txRes.raw_log}`);
    }

    return txRes;
}
