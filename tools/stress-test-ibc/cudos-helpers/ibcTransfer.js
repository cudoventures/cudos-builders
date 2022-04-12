import message from "./cosmos/proto";
import generateIbcTransferTx from "./generateIbcTransferTx";
import BigNumber from 'bignum';
import { Cosmos } from "@cosmostation/cosmosjs";
import { constants, wait, GREEN } from './utils';

import fetch from 'node-fetch';

export default async function ibcTransfer(config, senderMnemonic, dstAddrs, denom, maxAmountToSend){
    const provider = new Cosmos(config.REST, config.CHAIN_ID);

    provider.setPath("m/44'/118'/0'/0/0");
    provider.bech32MainPrefix = 'cudos'
    const address = provider.getAddress(senderMnemonic);
    const privKey = provider.getECPairPriv(senderMnemonic);
    const pubKeyAny = provider.getPubKeyAny(privKey);

    const data = await provider.getAccounts(address)

    if (!data.account || data.account.sequence === undefined){
        throw new Error("Account has no funds: " + address);
    }

    const msgInfos = []
    const msgsCount = dstAddrs.length;

    for (let i = 0; i < msgsCount; i++) {
        const sentAmount = maxAmountToSend.div(1000).mul(Math.floor(Math.random()*1000));
        msgInfos.push({
            amount: ""+ sentAmount,
            denom,
            receiver: dstAddrs[i],
            sender: address,
            privKey: privKey,
            srcPort: config.PORT,
            srcChannel: config.CHANNEL,
        })
    }   

    const txBody = generateIbcTransferTx(msgInfos, provider);
    const signerInfo = new message.cosmos.tx.v1beta1.SignerInfo({
        public_key: pubKeyAny,
        mode_info: { single: { mode: message.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
        sequence: data.account.sequence
    });

    const gasLimit = new BigNumber(config.GAS_PER_MSG).mul(msgsCount);

    const feeValue = new message.cosmos.tx.v1beta1.Fee({
        amount: [{ denom: "acudos", amount: gasLimit.mul(config.GAS_PRICE).toString()}],
        gas_limit: gasLimit.toString(),
    });

    const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });

    const signedTxBytes = provider.sign(txBody, authInfo, data.account.account_number, privKey);
    const txBroardcastResp = (await provider.broadcast(signedTxBytes)).tx_response;
    
    if(txBroardcastResp.code != 0){
        throw new Error(`code ${txBroardcastResp.code}: ${txBroardcastResp.raw_log}`);
    }

    const txHash = txBroardcastResp.txhash;

    await wait(35, 'for the Tx to pass');

    const res = await (await fetch(config.REST + constants.PATH_Q_TX + txHash)).json();
    const txRes = res.tx_response;

    if(!txRes){
        throw new Error(`txRes is undefined`)
    }
    if(txRes.code !== 0){
        throw new Error(` code ${txRes.code}: ${txRes.raw_log}`);
    }

    return txHash;
}