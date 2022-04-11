import Config from '../config/config.js';
import message from "./cosmos/proto";

function generateSendToEthTx(msgInfos) {
    const sendMsgs = [];
    
    for (let msgInfo of msgInfos) {
        const msg = generateSendToEthMsg(msgInfo)
        sendMsgs.push(msg);
    }

    const txBody = new message.cosmos.tx.v1beta1.TxBody({ 
        messages: sendMsgs, 
        memo: "Gravity bridge stress test messages" 
    });

    return txBody;
}

function generateSendToEthMsg(msgInfo) {
    const stringifiedAmount = msgInfo.amount;
    const bridgeFeeToAcudos = Config.CUDOS_NETWORK.BRIDGE_FEE;
    const msgTypePath = '/gravity.v1.MsgSendToEth'

    const msgData = {
            sender: msgInfo.sender,
            eth_dest: msgInfo.destiantionAddress,
            amount: {
                amount: stringifiedAmount,
                denom: "acudos",
            },
            bridge_fee: {
                amount: bridgeFeeToAcudos,
                denom: "acudos",
            },
    }

    const sendMsg = new message.gravity.v1.MsgSendToEth(msgData);

    return new message.google.protobuf.Any({
		type_url: msgTypePath,
		value: message.gravity.v1.MsgSendToEth.encode(sendMsg).finish()
	});
    
}

export {generateSendToEthTx as default};