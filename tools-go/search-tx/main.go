package main

import (
	"context"
	"fmt"

	"github.com/cosmos/cosmos-sdk/client"
)

func main() {
	ctx := context.Background()

	node, err := client.NewClientFromNode("http://localhost:46657")
	if err != nil {
		panic("cannot connect")
	}
	txQuerier := NewTxQuerier(node)
	results, err := txQuerier.Query(ctx, "message.sender='cudos18w06hwzxc7xvkuh809d9c34c8j57ujkrnwktwy' AND transfer.recipient='cudos1ruzlt5zfy4gvjaphewpvxlszul27f3evgs4sfk'")
	if err != nil {
		panic("Invalid query")
	}

	fmt.Printf("Result size: %d\n", results.TotalCount)
	for _, tx := range results.Txs {
		fmt.Printf("at height %d\n", tx.Height)
	}
}
