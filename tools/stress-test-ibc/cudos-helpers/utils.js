import config from '../config/config.js';
import message from "./cosmos/proto";
import fetch from 'node-fetch';
import BigNumber from 'bignum';


export const RED = "\x1b[31m";
export const GREEN = "\x1b[32m";

export const constants = {
    
    PATH_Q_TX: '/cosmos/tx/v1beta1/txs/',
    PATH_Q_BALANCES: "/cosmos/bank/v1beta1/balances/",
    PATH_Q_SUPPLY: "/cosmos/bank/v1beta1/supply",
    MSG_TYPE_IBC_TRANSFER: '/ibc.applications.transfer.v1.MsgTransfer',
}

export async function wait(seconds, message) {
    return new Promise((resolve) => {
        if(message != ''){
            console.log(GREEN, `Waiting ${seconds} seconds - ` + message);
        }

        setTimeout(resolve, seconds*1000);
    });
}

export async function getCudosAddressBalance(address, url) {
    const res = await fetch(url + constants.PATH_Q_BALANCES + address + '?by_denom=acudos');

    if(res.status !== 200){
        throw new Error('Error fetching address balance.');
    }

    const balances = (await res.json()).balances;

    if(balances.length == 0) {
        throw new Error(`no funds in address: ${address} => ${balances}`);
    }

    const amount = balances[0].amount;
    return new BigNumber(amount);
}

export async function getIbcDenom(address, url) {
    const res = await fetch(url + constants.PATH_Q_BALANCES + address);

    if(res.status !== 200){
        throw new Error('Error fetching IBC denom.');
    }

    const balances = (await res.json()).balances;

    if(balances.length === 0) {
        throw new Error(`no funds in address: ${address} => ${balances}`);
    }
    
    const denom = balances.find(b => b.denom !== 'acudos').denom;
    
    return  denom;
}

export async function getTotalDenomBalance(denom, url) {
    const res = await fetch(url + constants.PATH_Q_SUPPLY);

    if(res.status !== 200){
        throw new Error(`Error fetching IBC denom balance for: ${denom}`);
    }

    const data = await res.json();
    const amount = data.supply.find((c) => c.denom === denom).amount;
    return new BigNumber(amount);
}

// export async function sendAcudos(provider, faucetMnemonic, addresses, amount) {
    
//     const faucetAddr = provider.getAddress(faucetMnemonic);
//     const privKey = provider.getECPairPriv(faucetMnemonic);
//     const pubKeyAny = provider.getPubKeyAny(privKey);

//     const data = await provider.getAccounts(faucetAddr);

//     const sendMsgs = [];
//     for(const address of addresses){
//         const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
//             from_address: provider.getAddress(faucetMnemonic),
//             to_address: address,
//             amount: [{ denom: "acudos", amount: amount.toString() }]
//         });

//         const msgSendAny = new message.google.protobuf.Any({
//             type_url: "/cosmos.bank.v1beta1.MsgSend",
//             value: message.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish()
//         });

//         sendMsgs.push(msgSendAny);
//     }


//     const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: sendMsgs, memo: "test fund accounts" });

//     // --------------------------------- (2)authInfo ---------------------------------
//     const signerInfo = new message.cosmos.tx.v1beta1.SignerInfo({
//         public_key: pubKeyAny,
//         mode_info: { single: { mode: message.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
//         sequence: data.account.sequence
//     });

//     const totalGasLimit = (new BigNumber(config.CUDOS_NETWORK.GAS_PER_MSG)).mul(addresses.length);
//     const feeValue = new message.cosmos.tx.v1beta1.Fee({
//         amount: [{ denom: "acudos", amount: (new BigNumber(config.CUDOS_NETWORK.GAS_PRICE)).mul(totalGasLimit).toString() }],
//         gas_limit: totalGasLimit.toString(),
//     });

//     const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });

//     // -------------------------------- sign --------------------------------
//     const signedTxBytes = provider.sign(txBody, authInfo, data.account.account_number, privKey);
//     return provider.broadcast(signedTxBytes);
// }