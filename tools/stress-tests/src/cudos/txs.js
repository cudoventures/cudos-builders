import { constants, buildTx } from './cudosUtils.js';
import { generateIbcTransferMsg, generateSendToEthMsg, generateBankSendMsg, generateDelegateMsg} from './msgs.js';
import message from '../../cosmos/proto'
import BigNumber from 'bignum';

export async function ibcTransferTx(provider, signer, transferConfig, dstAddrs, denom, maxAmountToSend){
    //some random high number
    const TIMEOUT_HEIGHT = '100000000000';

    const transferMsgs = [];
    for (let i = 0; i < dstAddrs.length; i++) {
        const amount = '' + maxAmountToSend.div(1000).mul(Math.floor(Math.random()*1000));
        const msg = generateIbcTransferMsg(transferConfig.port, transferConfig.channel, amount, denom, signer.address, dstAddrs[i], TIMEOUT_HEIGHT)
        transferMsgs.push(msg);
    }
   
    const signedTxBytes = await buildTx(provider, signer, transferMsgs, constants.GAS_LIMITS.IBC_TRANSFER);
    return provider.broadcast(signedTxBytes);
}

export async function sendToEthTx(provider, signer, config, destiantionAddresses, maxAmountToSend){
    sendMsgs = [];
    const msgsCount = destiantionAddresses.length;
    for (let i = 0; i < msgsCount; i++) {
        const amount = ""+maxAmountToSend.div(1000).mul(Math.floor(Math.random()*1000))
        const msg = generateSendToEthMsg(signer.address, destiantionAddresses[i], amount, config.BRIDGE_FEE)
        sendMsgs.push(msg);
    }   

    const signedTxBytes = await buildTx(provider, signer, sendMsgs, constants.GAS_LIMITS.GRAVITY_SEND_TO_ETH)
    return provider.broadcast(signedTxBytes);
}

export async function bankSendTx(provider, signer, dstAddrs, denom, amountToSend) {
    const sendMsgs = [];
    // for(const address of dstAddrs){
    //     const amount = amountToSend.toString();
    //     const msgAny = generateBankSendMsg(amount, denom, signer.address, address);
    //     sendMsgs.push(msgAny);
    // }

    const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
        from_address: provider.address,
        to_address: dstAddrs[0],
        amount: [{ denom: denom, amount: amountToSend.toString() }]
    });

    sendMsgs.push(new message.google.protobuf.Any({
        type_url: constants.MSG_TYPE_BANK_SEND,
        value: message.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish()
    }));

    const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: sendMsgs, memo: "test fund accounts" });

    // --------------------------------- (2)authInfo ---------------------------------
    const signerInfo = new message.cosmos.tx.v1beta1.SignerInfo({
        public_key: signer.pubKey,
        mode_info: { single: { mode: message.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
        sequence: signer.data.account.sequence
    });

    const totalGasLimit = (new BigNumber(190000)).mul(dstAddrs.length);
    const feeValue = new message.cosmos.tx.v1beta1.Fee({
        amount: [{ denom: constants.GAS_DENOM, amount: (new BigNumber(2)).mul(totalGasLimit).toString() }],
        gas_limit: totalGasLimit.toString(),
    });

    const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });
    const signedTxBytes = provider.sign(txBody, authInfo, signer.data.account.account_number, signer.privKey);
    return provider.broadcast(signedTxBytes);


    // -------------------------------- sign --------------------------------
    // const signedTxBytes = await buildTx(provider, signer, sendMsgs, constants.GAS_LIMITS.BANK_SEND)
    // return provider.broadcast(signedTxBytes);
}

export async function delegateTx(provider, signer, validatorAddresses, amount) {

    const delegateMsgs = [];
    for(const address of validatorAddresses){
        const msgAny = generateDelegateMsg(signer.address, address, amount.toString());
        delegateMsgs.push(msgAny);
    }

    // -------------------------------- sign --------------------------------
    const signedTxBytes = await buildTx(provider, signer, delegateMsgs, constants.GAS_LIMITS.BANK_SEND)
    return provider.broadcast(signedTxBytes);
}