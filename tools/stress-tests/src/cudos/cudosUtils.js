import config from '../../config/config.js';
import message from "../../cosmos/proto";
import fetch from 'node-fetch';
import BigNumber from 'bignum';
import { generateBankSendMsg } from './msgs';

export const constants = {
    GAS_DENOM: "acudos",
    PATH_Q_TX: '/cosmos/tx/v1beta1/txs/',
    PATH_Q_BALANCES: "/cosmos/bank/v1beta1/balances/",
    PATH_Q_SUPPLY: "/cosmos/bank/v1beta1/supply",
    MSG_TYPE_IBC_TRANSFER: '/ibc.applications.transfer.v1.MsgTransfer',
    MSG_TYPE_BANK_SEND: "/cosmos.bank.v1beta1.MsgSend",
    MSG_TYPE_DELEGATE: "/cosmos.staking.v1beta1.MsgDelegate",
    GAS_LIMITS: {
        IBC_TRANSFER: 150000,
        GRAVITY_SEND_TO_ETH: 200000,
        BANK_SEND: 100000,
        DELEGATE: 200000,
    }
}

export async function checkTx(url, txPromise) {
    const txBroardcastResp = (await txPromise).tx_response;
    if(txBroardcastResp.code != 0){
        throw new Error(`code ${txBroardcastResp.code}: ${txBroardcastResp.raw_log}`);
    }

    const txHash = txBroardcastResp.txhash;

    const res = await (await fetch(url + constants.PATH_Q_TX + txHash)).json();
    const txRes = res.tx_response;

    if(!txRes){
        throw new Error(`txRes is undefined`)
    }
    if(txRes.code !== 0){
        throw new Error(` code ${txRes.code}: ${txRes.raw_log}`);
    }

    return txHash;
}

export async function buildTx(provider, signer, sendMsgs, gasLimit) {
    const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: sendMsgs, memo: "STRESS TEST" });
    console.log(txBody);
    // --------------------------------- feeValue ---------------------------------
    const totalGasLimit = (new BigNumber(gasLimit)).mul(sendMsgs.length);
    const feeValue = new message.cosmos.tx.v1beta1.Fee({
        amount: [{ denom: constants.GAS_DENOM, amount: (new BigNumber(provider.gasPrice)).mul(totalGasLimit).toString() }],
        gas_limit: totalGasLimit.toString(),
    });
    console.log(provider)

    // --------------------------------- authInfo ---------------------------------
    const signerInfo = new message.cosmos.tx.v1beta1.SignerInfo({
        public_key: signer.pubKey,
        mode_info: { single: { mode: message.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
        sequence: signer.data.account.sequence
    });
    const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });
    console.log(signerInfo);
    // -------------------------------- sign --------------------------------
    return provider.sign(txBody, authInfo, signer.data.account.account_number, signer.privKey);
}

export async function getSigner(provider, mnemonic) {
    const address = provider.getAddress(mnemonic);
    const data = await provider.getAccounts(address);
    const privKey = provider.getECPairPriv(mnemonic);
    const pubKey = provider.getECPairPriv(mnemonic);

    if (!data.account || data.account.sequence === undefined){
        throw new Error("Account has no funds: " + signer.address);
    }

    return {
        address,
        data,
        privKey,
        pubKey,
    }
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

export async function sendAcudos(provider, faucetMnemonic, addresses, amount) {
    const faucetAddr = provider.getAddress(faucetMnemonic);
    const privKey = provider.getECPairPriv(faucetMnemonic);
    const pubKeyAny = provider.getPubKeyAny(privKey);

    const data = await provider.getAccounts(faucetAddr);

    const sendMsgs = [];
    for(const address of addresses){
        const msgAny = generateBankSendMsg(amount, denom, provider.getAddress(faucetMnemonic), address);
        sendMsgs.push(msgAny);
    }


    const txBody = new message.cosmos.tx.v1beta1.TxBody({ messages: sendMsgs, memo: "test fund accounts" });

    // --------------------------------- (2)authInfo ---------------------------------
    const signerInfo = new message.cosmos.tx.v1beta1.SignerInfo({
        public_key: pubKeyAny,
        mode_info: { single: { mode: message.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
        sequence: data.account.sequence
    });

    const totalGasLimit = (new BigNumber(config.CUDOS_NETWORK.GAS_PER_MSG)).mul(addresses.length);
    const feeValue = new message.cosmos.tx.v1beta1.Fee({
        amount: [{ denom: constants.GAS_DENOM, amount: (new BigNumber(config.CUDOS_NETWORK.GAS_PRICE)).mul(totalGasLimit).toString() }],
        gas_limit: totalGasLimit.toString(),
    });

    const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });

    // -------------------------------- sign --------------------------------
    const signedTxBytes = provider.sign(txBody, authInfo, data.account.account_number, privKey);
    return provider.broadcast(signedTxBytes);
}