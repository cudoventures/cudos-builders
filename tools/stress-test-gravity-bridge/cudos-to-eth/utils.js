import config from '../config/config.js';
import message from "./cosmos/proto";
import fetch from 'node-fetch';
import BigNumber from 'bignum';

export async function getCudosAddressBalance(address) {
    const res = await fetch(config.CUDOS_NETWORK.REST + "/cosmos/bank/v1beta1/balances/" + address);

    const data = await res.json();
    const amount = data.balances.find(a => a.denom === 'acudos').amount;
    return new BigNumber(amount);
}

export async function sendAcudos(provider, faucetMnemonic, addresses, amount) {
    
    const faucetAddr = provider.getAddress(faucetMnemonic);
    const privKey = provider.getECPairPriv(faucetMnemonic);
    const pubKeyAny = provider.getPubKeyAny(privKey);

    const data = await provider.getAccounts(faucetAddr);

    const sendMsgs = [];
    for(const address of addresses){
        const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
            from_address: provider.getAddress(faucetMnemonic),
            to_address: address,
            amount: [{ denom: "acudos", amount: amount.toString() }]
        });

        const msgSendAny = new message.google.protobuf.Any({
            type_url: "/cosmos.bank.v1beta1.MsgSend",
            value: message.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish()
        });

        sendMsgs.push(msgSendAny);
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
        amount: [{ denom: "acudos", amount: (new BigNumber(config.CUDOS_NETWORK.GAS_PRICE)).mul(totalGasLimit).toString() }],
        gas_limit: totalGasLimit.toString(),
    });

    const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });

    // -------------------------------- sign --------------------------------
    const signedTxBytes = provider.sign(txBody, authInfo, data.account.account_number, privKey);
    return provider.broadcast(signedTxBytes);
}