#!/bin/bash -i

cd $PARAM_SOURCE_DIR

echo -ne "Updating the repos...";
cd ./CudosNode && git pull &>/dev/null && cd ..
cd ./CudosBuilders && git pull &>/dev/null && cd ..
cd ./CudosGravityBridge && git pull &>/dev/null && cd ..

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
