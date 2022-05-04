import fetch from 'node-fetch';
import BigNumber from 'bignum';
import wait from '../utils/wait';
export const constants = {
    GAS_DENOM: "acudos",
    PATH_Q_TX: '/cosmos/tx/v1beta1/txs/',
    PATH_Q_BALANCES: "/cosmos/bank/v1beta1/balances/",
    PATH_Q_SUPPLY: "/cosmos/bank/v1beta1/supply",
    GAS_LIMITS: {
        IBC_TRANSFER: new BigNumber(150000),
        GRAVITY_SEND_TO_ETH: new BigNumber(200000),
        BANK_SEND: new BigNumber(100000),
        DELEGATE: new BigNumber(200000),
    }
}

export async function getRandomWallets(provider, numberOfWallets) {
    const wallets = [];
    for (let i = 0; i < numberOfWallets; i++) {
        const mnemonic = provider.getRandomMnemonic();
        const address = provider.getAddress(mnemonic);
        
        wallets.push({
            mnemonic,
            address
        });
    }

    return wallets;
}

export async function checkTx(url, txBroadcastResp) {
    if(txBroadcastResp.code !== 0){
        throw new Error(`code ${txBroadcastResp.code}: ${txBroadcastResp.raw_log}`);
    }

    const txHash = txBroadcastResp.txhash;

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

export async function getSigner(provider, mnemonic) {
    const address = provider.getAddress(mnemonic);
    const account = (await provider.getAccounts(address)).account;
    const privKey = provider.getECPairPriv(mnemonic);
    const pubKey = provider.getPubKeyAny(privKey);

    if (!account || account.sequence === undefined){
        throw new Error("Account has no funds: " + address);
    }

    return {
        provider,
        account,
        privKey,
        pubKey
    }
}

export async function getAddressBalance(address, denom, url) {
    const res = await fetch(url + constants.PATH_Q_BALANCES + address + `?by_denom=${denom}`);

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

export async function getTotalDenomBalance(denom, url) {
    const res = await fetch(url + constants.PATH_Q_SUPPLY);

    if(res.status !== 200){
        throw new Error(`Error fetching IBC denom balance for: ${denom}`);
    }

    const data = await res.json();
    const amount = data.supply.find((c) => c.denom === denom).amount;
    return new BigNumber(amount);
}