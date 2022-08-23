#!/bin/bash -i

echo -ne "Processing env...";

cd "$NODE_BUILDER_PATH"

if [ "$NODE_NAME" = "seed-node" ]; then
    \cp ./seed-node.env.example "$NODE_ENV_PATH"
elif [ "$NODE_NAME" = "sentry-node" ]; then
    \cp ./sentry-node.env.example "$NODE_ENV_PATH"
elif [ "$NODE_NAME" = "full-node" ]; then
    \cp ./full-node.env.example "$NODE_ENV_PATH"
fi

sed -i "s~SHOULD_USE_STATE_SYNC=.*~SHOULD_USE_STATE_SYNC=\"true\"~g" "$NODE_ENV_PATH"
sed -i "s~SHOULD_USE_GLOBAL_PEERS=.*~SHOULD_USE_GLOBAL_PEERS=\"true\"~g" "$NODE_ENV_PATH"
sed -i "s~MONIKER=.*~MONIKER=\"$PARAM_MONIKER\"~g" "$NODE_ENV_PATH"
sed -i "s~MONITORING_ENABLED=.*~MONITORING_ENABLED=\"$PARAM_MONITORING_ENABLED\"~g" "$NODE_ENV_PATH"
if [ "$PARAM_EXTERNAL_ADDRESS" != "" ]; then
    sed -i "s~EXTERNAL_ADDRESS=.*~EXTERNAL_ADDRESS=\"$PARAM_EXTERNAL_ADDRESS\"~g" "$NODE_ENV_PATH"
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
