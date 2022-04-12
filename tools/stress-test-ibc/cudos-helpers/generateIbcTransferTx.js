import message from "./cosmos/proto";
import {constants} from "./utils"

function generateIbcTransferTx(msgInfos) {
    const transferMsgs = [];
    
    for (let msgInfo of msgInfos) {
        const msg = generateIbcTransferMsg(msgInfo)
        transferMsgs.push(msg);
    }

    const txBody = new message.cosmos.tx.v1beta1.TxBody({ 
        messages: transferMsgs, 
        memo: "IBC stress test messages" 
    });

    return txBody;
}

function generateIbcTransferMsg(msgInfo) {
    const msgData = {
            source_port: msgInfo.srcPort,
            source_channel: msgInfo.srcChannel,
            token: {
                amount: msgInfo.amount,
                denom: msgInfo.denom,
            },
            sender: msgInfo.sender,
            receiver: msgInfo.receiver,
            timeout_height: {
                revision_height: 10000000000000,
            },
            timeout_timestamp: 0,
    }

    const sendMsg = new message.ibc.applications.transfer.v1.MsgTransfer(msgData);

    return new message.google.protobuf.Any({
		type_url: constants.MSG_TYPE_IBC_TRANSFER,
		value: message.ibc.applications.transfer.v1.MsgTransfer.encode(sendMsg).finish()
	});
    
}

export {generateIbcTransferTx as default};