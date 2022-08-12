# Start the node (remove the --pruning=nothing flag if historical queries are not needed)
ethermintd start \
--evm.tracer=json \
--trace \
--log_level info \
--json-rpc.api eth,txpool,personal,net,debug,web3,miner \
--api.enable \
--home ${CUDOS_HOME}
