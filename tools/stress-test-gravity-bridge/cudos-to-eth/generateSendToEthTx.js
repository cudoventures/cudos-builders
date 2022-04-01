import Config from '../config/config.js';
import message from "../cosmos/proto.js";

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
    const stringifiedAmount = msgInfo.amount + "0".repeat(18);
    const bridgeFeeToAcudos = Config.CUDOS_NETWORK.BRIDGE_FEE + "0".repeat(18);
    const msgTypePath = '/gravity.v1.MsgSendToEth'

    console.log(msgInfo.destiantionAddress);
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

    console.log(sendMsg)
    return new message.google.protobuf.Any({
		type_url: msgTypePath,
		value: message.gravity.v1.MsgSendToEth.encode(sendMsg).finish()
	});
    
}

export {generateSendToEthTx as default};