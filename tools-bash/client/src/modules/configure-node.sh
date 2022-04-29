#!/bin/bash -i

echo -ne "Configurating the node...";
confirmTomlPath="$VOLUME_PATH/config/config.toml"
if [ "$PARAM_PRIVATE_PEER_IDS" != "" ]; then
    sed -i "s~private_peer_ids = .*~private_peer_ids = \"$PARAM_PRIVATE_PEER_IDS\"~g" "$confirmTomlPath"
fi
if [ "$PARAM_PERSISTENT_PEERS" != "" ]; then
    sed -i "s~seeds = .*~seeds = \"\"~g" "$confirmTomlPath"
    sed -i "s~persistent_peers = .*~persistent_peers = \"$PARAM_PERSISTENT_PEERS\"~g" "$confirmTomlPath"
fi
echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
