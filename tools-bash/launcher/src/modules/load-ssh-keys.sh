#!/bin/bash -i

if [ "$SSH_AGENT_PID" = "" ]; then
    eval $(ssh-agent -s);
fi

computersSize=$(getComputersSize)
for i in $(seq 0 $(($computersSize-1)))
do
    sshKeyPath=$(getComputerSshKeyPath $i)
    pass=$(getComputerPass $i)
    echo "echo '$pass'" > /tmp/laucher-ask-pass.sh
    chmod +x /tmp/laucher-ask-pass.sh
    DISPLAY=:0 SSH_ASKPASS="/tmp/laucher-ask-pass.sh" ssh-add $sshKeyPath < /dev/null
done

rm -rf /tmp/laucher-ask-pass.sh