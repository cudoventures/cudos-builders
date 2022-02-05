#!/bin/bash -i

echo -ne "Loading SSH keys...";

if [ "$SSH_AGENT_PID" = "" ]; then
    result=$(eval $(ssh-agent -s))
fi

computersSize=$(getComputersSize)
for i in $(seq 0 $(($computersSize-1)))
do
    sshKeyPath=$(getComputerSshKeyPath $i)
    pass=$(getComputerPass $i)
    echo "echo '$pass'" > /tmp/laucher-ask-pass.sh
    chmod +x /tmp/laucher-ask-pass.sh
    DISPLAY=:0 SSH_ASKPASS="/tmp/laucher-ask-pass.sh" ssh-add $sshKeyPath < /dev/null 2> /dev/null
    if [ "$?" != 0 ]; then
        exit $?;
    fi;
done

rm -rf /tmp/laucher-ask-pass.sh

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
