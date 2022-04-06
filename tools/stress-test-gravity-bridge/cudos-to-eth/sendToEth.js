import { Cosmos } from "@cosmostation/cosmosjs";
import generateSendToEthTx from "./generateSendToEthTx.js";
import Config from '../config/config.js';
import message from "./cosmos/proto";
import BigNumber from 'bignum';

export default async function sendToEth(senderMnemonic, destiantionAddresses, sendAmount){
    const provider = new Cosmos(Config.CUDOS_NETWORK.REST, Config.CUDOS_NETWORK.CHAIN_ID);
    provider.setPath("m/44'/118'/0'/0/0");
    provider.bech32MainPrefix = 'cudos'

    const address = provider.getAddress(senderMnemonic);
    const privKey = provider.getECPairPriv(senderMnemonic);
    const pubKeyAny = provider.getPubKeyAny(privKey);

    provider.getAccounts(address).then(data => {
        if (data.account.sequence === undefined){
            console.log("Account has no funds: " + address);
        }
        const msgInfos = []
        const msgsCount = destiantionAddresses.length;

        for (let i = 0; i < msgsCount; i++) {
            msgInfos.push({
                amount: ""+sendAmount,
                destiantionAddress: destiantionAddresses[i],
                sender: address,
                privKey: privKey,
            })
        }   

        const txBody = generateSendToEthTx(msgInfos, provider);
        const signerInfo = new message.cosmos.tx.v1beta1.SignerInfo({
            public_key: pubKeyAny,
            mode_info: { single: { mode: message.cosmos.tx.signing.v1beta1.SignMode.SIGN_MODE_DIRECT } },
            sequence: data.account.sequence
        });

        const gasLimit = new BigNumber(Config.CUDOS_NETWORK.GAS_PER_MSG).mul(msgsCount);

        const feeValue = new message.cosmos.tx.v1beta1.Fee({
            amount: [{ denom: "acudos", amount: gasLimit.mul(Config.CUDOS_NETWORK.GAS_PRICE).toString()}],
            gas_limit: gasLimit.toString(),
        });

        const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });

        const signedTxBytes = provider.sign(txBody, authInfo, data.account.account_number, privKey);
        return provider.broadcast(signedTxBytes);
    })
}