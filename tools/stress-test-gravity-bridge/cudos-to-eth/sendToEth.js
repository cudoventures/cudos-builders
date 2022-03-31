import { Cosmos } from "@cosmostation/cosmosjs";
import generateSendToEthTx from "./generateSendToEthTx.js";
import Config from '../config/config.js';
import message from "../cosmos/proto.js";

export default function sendToEth(destiantionAddresses, sendAmount, senderMnemonic){
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

        const feeValue = new message.cosmos.tx.v1beta1.Fee({
            amount: [{ denom: "acudos", amount: Config.CUDOS_NETWORK.FEE }],
            gas_limit: 200000 * msgsCount
        });

        const authInfo = new message.cosmos.tx.v1beta1.AuthInfo({ signer_infos: [signerInfo], fee: feeValue });

        console.log(txBody)
        const signedTxBytes = provider.sign(txBody, authInfo, data.account.account_number, privKey);
        provider.broadcast(signedTxBytes).then(value => console.log(value));
    })
}