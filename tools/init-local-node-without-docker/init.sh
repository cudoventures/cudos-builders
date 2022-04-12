#!/bin/bash
set -a # automatically export all variables
source ../../docker/root-node/root-node.local.env
set +a

if [[ "$OSTYPE" == "darwin"* ]]; then
    cp ../../docker/root-node/scripts/init-root.sh ./init-root-copy.sh
    sed -i '' "s/sed -i/sed -i \"\"/" "./init-root-copy.sh"
    sed -i '' "s/|& tee/>/" "./init-root-copy.sh"
    sed -e 's/[[:<:]]os[[:>:]]/test/g' "./init-root-copy.sh" >init-local-node.sh
    chmod a+x init-local-node.sh
    source ./init-local-node.sh
    rm ./init-root-copy.sh
else
    cp ../../docker/root-node/scripts/init-root.sh ./init-local-node.sh
    chmod a+x init-local-node.sh
    source ./init-local-node.sh
fi

rm ./init-local-node.sh
cudos-noded start --home ./cudos-data/
