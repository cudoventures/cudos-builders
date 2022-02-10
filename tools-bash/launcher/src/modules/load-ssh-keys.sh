#!/bin/bash -i

echo -ne "Loading SSH keys...";

if [ "$SSH_AGENT_PID" = "" ]; then
    eval $(ssh-agent -s) &> /dev/null
fi

if [ "$SSH_AGENT_PID" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error starting the SSH agent. Please start it manually $?: ${result}";
    exit 1;
fi

computersSize=$(getComputersSize)
for i in $(seq 0 $(($computersSize-1)))
do
    sshKeyPath=$(getComputerSshKeyPath $i)
    pass=$(getComputerPass $i)
    echo "echo '$pass'" > /tmp/laucher-ask-pass.sh
    chmod +x /tmp/laucher-ask-pass.sh
    result=$(DISPLAY=:0 SSH_ASKPASS="/tmp/laucher-ask-pass.sh" ssh-add $sshKeyPath < /dev/null &> /dev/null)
    if [ "$?" != 0 ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} There was an error adding SSH key $?: ${result}";
        exit $?;
    fi;
done

rm -rf /tmp/laucher-ask-pass.sh

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
