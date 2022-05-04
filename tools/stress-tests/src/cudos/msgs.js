import { gravity, cosmos, ibc, google } from "../../cosmos/proto";

export function sendToEthMsg(args) {
    const msg = new gravity.v1.MsgSendToEth({
            sender: args.fromAddress,
            eth_dest: args.toAddress,
            amount: {
                amount: args.amount.toString(),
                denom: "acudos",
            },
            bridge_fee: {
                amount: args.bridgeFee.toString(),
                denom: "acudos",
            },
    })

    return new google.protobuf.Any({
		type_url: '/gravity.v1.MsgSendToEth',
		value: gravity.v1.MsgSendToEth.encode(msg).finish()
	});
}

export function bankSendMsg(args) {
    const msg = new cosmos.bank.v1beta1.MsgSend({
        from_address: args.fromAddress,
        to_address: args.toAddress,
        amount: [{ 
            denom: args.denom, 
            amount: args.amount.toString() 
        }]
    });

    return new google.protobuf.Any({
        type_url: "/cosmos.bank.v1beta1.MsgSend",
        value: cosmos.bank.v1beta1.MsgSend.encode(msg).finish()
    });
}

export function ibcTransferMsg(args) {
    const msg = new ibc.applications.transfer.v1.MsgTransfer({
        source_port: args.sourcePort,
        source_channel: args.sourceChannel,
        token: {
            amount: args.amount.toString(),
            denom: args.denom,
        },
        sender: args.fromAddress,
        receiver: args.toAddress,
        //timeout_timestamp is in nanoseconds
        timeout_timestamp: (Date.now() + 3600000) + '000000',
    })

    return new google.protobuf.Any({
		type_url: '/ibc.applications.transfer.v1.MsgTransfer',
		value: ibc.applications.transfer.v1.MsgTransfer.encode(msg).finish()
	});
}

export function delegateMsg(args) {
    const msg = new cosmos.staking.v1beta1.MsgDelegate({
        delegator_address: args.fromAddress,
        validator_address: args.toAddress,
        amount: {
          denom: args.denom,
          amount: args.amount.toString(),
        },
      });
    
    return new google.protobuf.Any({
        type_url: "/cosmos.staking.v1beta1.MsgDelegate",
        value: cosmos.staking.v1beta1.MsgDelegate.encode(msg).finish(),
    });
}