package main

import (
	"encoding/base64"
	"fmt"

	"github.com/cosmos/cosmos-sdk/codec"
	codedtypes "github.com/cosmos/cosmos-sdk/codec/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/cosmos/gogoproto/proto"
	ibctypes "github.com/cosmos/ibc-go/v7/modules/apps/27-interchain-accounts/types"
)

func main() {
	interfaceRegistry := codedtypes.NewInterfaceRegistry()
	cdc := codec.NewProtoCodec(interfaceRegistry)

	msg := &banktypes.MsgSend{
		FromAddress: "cudos199eyqx8efneqv8yfqfutevyfz3564ef7zl9nzf25z0kwunjqhulqsf6ff6",
		ToAddress:   "cudos1vh5t66756m7safzz07pajdt7mvvzufrewgqtm3",
		Amount:      sdk.NewCoins(sdk.NewCoin("acudos", sdk.NewInt(12))),
	}

	dataBytes, _ := ibctypes.SerializeCosmosTx(cdc, []proto.Message{msg})
	dataBytesEncoded := base64.StdEncoding.EncodeToString(dataBytes)

	fmt.Println(dataBytesEncoded)
}
