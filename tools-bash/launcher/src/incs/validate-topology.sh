#!/bin/bash -i

# check deployer network

echo -ne "Validating topology...";

computersSize=$(getComputersSize)
for i in $(seq 0 $(($computersSize-1)))
do
    id=$(getComputerId $i)
    if [ "$id" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Computer[$i] does not have an id";
        exit 1;
    fi

    ip=$(getComputerIp $i)
    if [ "$ip" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Computer[$i] does not have an ip";
        exit 1;
    fi
    if [[ ! "$ip" =~ (^([0-9]{1,3}\.){3}[0-9]{1,3}$) ]]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Computer[$i]'s ip address is not valid";
        exit 1;
    fi

    internalIp=$(getComputerInternalIp $i)
    if [ "$internalIp" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Computer[$i] does not have an internalIp";
        exit 1;
    fi
    if [[ ! "$internalIp" =~ (^([0-9]{1,3}\.){3}[0-9]{1,3}$) ]]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Computer[$i]'s internalIp address is not valid";
        exit 1;
    fi

    port=$(getComputerPort $i)
    if [ "$port" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Computer[$i] does not have an port";
        exit 1;
    fi

    user=$(getComputerUser $i)
    if [ "$user" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Computer[$i] does not have an user";
        exit 1;
    fi

    sshKeyPath=$(getComputerSshKeyPath $i)
    if [ "$sshKeyPath" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Computer[$i] does not have an sshKeyPath";
        exit 1;
    fi
    if [ ! -f "$sshKeyPath" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Cannot find \"$sshKeyPath\" (Computer[$i]'s ssh key)";
        exit 1;
    fi

    pass=$(getComputerPass $i)
    if [ "$pass" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Computer[$i] does not have an pass";
        exit 1;
    fi
    if [[ "$pass" =~ (.*"'".*) ]]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The password must not contain '";
        exit 1;
    fi

done

validatorComputerId=$(getValidatorComputerId)
if [ "$id" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The validator does not have computerId";
    exit 1;
fi
validatorComputerIndex=$(getComputerIndexById $validatorComputerId)
if [ "$validatorComputerIndex" = "-1" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The validator's computer, with id \"$validatorComputerId\", does not exists in computers array.";
    exit 1;
fi

validatorEnvPath=$(getValidatorEnvPath)
if [ "$validatorEnvPath" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The validator does not have envPath";
    exit 1;
fi
if [ ! -f "$validatorEnvPath" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Cannot find \"$validatorEnvPath\" (Validator's .env file)";
    exit 1;
fi

validatorOrchEnvPath=$(getValidatorOrchEnvPath)
if [ "$validatorOrchEnvPath" = "" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The validator does not have orchEnvPath";
    exit 1;
fi
if [ ! -f "$validatorOrchEnvPath" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Cannot find \"$validatorOrchEnvPath\" (Orchestrator's .env file)";
    exit 1;
fi

seedsSize=$(getSeedsSize)
for i in $(seq 0 $(($seedsSize-1)))
do
    seedComputerId=$(getSeedComputerId $i)
    if [ "$seedComputerId" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The seed($i) does not have computerId";
        exit 1;
    fi

    seedComputerIndex=$(getComputerIndexById "$seedComputerId")
    if [ "$seedComputerIndex" = "-1" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The seed($i)'s computer, with id \"$seedComputerId\", does not exists in computers array.";
        exit 1;
    fi

    seedEnvPath=$(getSeedEnvPath $i)
    if [ "$seedEnvPath" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The seed($i) does not have envPath";
        exit 1;
    fi
    if [ ! -f "$seedEnvPath" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Cannot find \"$seedEnvPath\" (Seed($i)'s .env file)";
        exit 1;
    fi
done

sentrysSize=$(getSentriesSize)
for i in $(seq 0 $(($sentrysSize-1)))
do
    sentryComputerId=$(getSentryComputerId $i)
    if [ "$sentryComputerId" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The sentry($i) does not have computerId";
        exit 1;
    fi

    sentryComputerIndex=$(getComputerIndexById "$sentryComputerId")
    if [ "$sentryComputerIndex" = "-1" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The sentry($i)'s computer, with id \"$sentryComputerId\", does not exists in computers array.";
        exit 1;
    fi

    sentryEnvPath=$(getSentryEnvPath $i)
    if [ "$sentryEnvPath" = "" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} The sentry($i) does not have envPath";
        exit 1;
    fi
    if [ ! -f "$sentryEnvPath" ]; then
        echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Cannot find \"$sentryEnvPath\" (Sentry($i)'s .env file)";
        exit 1;
    fi
done

if [ "$(($seedsSize + $sentrysSize + 1))" != "$computersSize" ]; then
    echo -e "${STYLE_RED}Error:${STYLE_DEFAULT} Computers's count does not match the number of nodes";
    exit 1;
fi

echo -e "${STYLE_GREEN}OK${STYLE_DEFAULT}";
