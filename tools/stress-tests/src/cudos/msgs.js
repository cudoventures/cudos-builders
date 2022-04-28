import { constants } from "./cudosUtils"
import message from "../../cosmos/proto";

export function generateSendToEthMsg(sender, receiver, amount, bridgeFee) {
    const msgTypePath = '/gravity.v1.MsgSendToEth'

    const msgData = {
            sender: sender,
            eth_dest: receiver,
            amount: {
                amount: amount,
                denom: "acudos",
            },
            bridge_fee: {
                amount: bridgeFee,
                denom: "acudos",
            },
    }

    const sendMsg = new message.gravity.v1.MsgSendToEth(msgData);

    return new message.google.protobuf.Any({
		type_url: msgTypePath,
		value: message.gravity.v1.MsgSendToEth.encode(sendMsg).finish()
	});
}

export function generateBankSendMsg(amount, denom, sender, receiver) {
    const msgSend = new message.cosmos.bank.v1beta1.MsgSend({
        from_address: sender,
        to_address: receiver,
        amount: [{ denom: denom, amount: amount.toString() }]
    });

    return new message.google.protobuf.Any({
        type_url: constants.MSG_TYPE_BANK_SEND,
        value: message.cosmos.bank.v1beta1.MsgSend.encode(msgSend).finish()
    });
}

export function generateIbcTransferMsg(srcPort, srcChannel, amount, denom, sender, receiver, timeoutHeight) {
    const msgData = {
            source_port: srcPort,
            source_channel: srcChannel,
            token: {
                amount: amount,
                denom: denom,
            },
            sender: sender,
            receiver: receiver,
            timeout_height: {
                revision_height: timeoutHeight,
            },
            timeout_timestamp: 0,
    }

    const sendMsg = new message.ibc.applications.transfer.v1.MsgTransfer(msgData);

    return new message.google.protobuf.Any({
		type_url: constants.MSG_TYPE_IBC_TRANSFER,
		value: message.ibc.applications.transfer.v1.MsgTransfer.encode(sendMsg).finish()
	});
}

export function generateDelegateMsg(amount, denom, delegator_address, validator_address) {
    const msgSend = new message.cosmos.staking.v1beta1.MsgDelegate({
        delegator_address,
        validator_address,
        amount: [{ denom: denom, amount: amount.toString() }]
    });

    return new message.google.protobuf.Any({
        type_url: constants.MSG_TYPE_DELEGATE,
        value: message.cosmos.staking.v1beta1.MsgDelegate.encode(msgSend).finish()
    });
}