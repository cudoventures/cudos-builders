FROM debian:buster

ARG USER_NAME
ARG USER_ID
ARG GROUP_NAME
ARG GROUP_ID
ARG DOCKER_GROUP_ID
ARG WORKDIR
ARG PASS="cudos"
ARG LOCAL_DOCKER_SOURCE

RUN apt-get update && \
    apt-get install apt-transport-https ca-certificates curl gnupg lsb-release sudo openssh-server -y && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && \
    echo \
    "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null && \
    apt-get update && \
    apt-get install docker-ce docker-ce-cli containerd.io -y

RUN curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

RUN groupmod -g ${DOCKER_GROUP_ID} docker && \
    if [ $USER_NAME != 'root' ]; then \
        addgroup -gid ${GROUP_ID} ${GROUP_NAME}; \
        adduser --disabled-password -gecos "" -uid $USER_ID -gid ${GROUP_ID} ${USER_NAME}; \
        usermod -a -G docker ${USER_NAME}; \
        usermod -a -G sudo ${USER_NAME}; \
        echo "$USER_NAME:$PASS" | chpasswd; \
    fi && \
    echo "PermitRootLogin yes" >> /etc/ssh/sshd_config && \
    echo "root:$PASS" | chpasswd && \
    echo "${USER_NAME} ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers; \
    mkdir -p ${WORKDIR}/CudosData && \
    chown -R ${USER_NAME}:${GROUP_NAME} ${WORKDIR}

WORKDIR $WORKDIR

COPY ./CudosNode ./CudosBuilders/readme.md ./source/CudosNode/
COPY ./CudosBuilders ./CudosBuilders/readme.md ./source/CudosBuilders/
COPY ./CudosGravityBridge ./CudosBuilders/readme.md ./source/CudosGravityBridge/
COPY ./CudosGravityBridgeUI ./CudosBuilders/readme.md ./source/CudosGravityBridgeUI/
COPY ./CudosExplorer ./CudosBuilders/readme.md ./source/CudosExplorer/
COPY ./CudosFaucet ./CudosBuilders/readme.md ./source/CudosFaucet/

RUN chown -R ${USER_NAME}:${GROUP_NAME} ./source

USER ${USER_NAME}

RUN if [ $LOCAL_DOCKER_SOURCE = "remote" ]; then \
        git clone --depth 1 --branch cudos-dev https://github.com/CudoVentures/cudos-node.git ./CudosNode; \
        git clone --depth 1 --branch cudos-dev https://github.com/CudoVentures/cudos-builders.git ./CudosBuilders; \
        git clone --depth 1 --branch cudos-dev-merge-althea https://github.com/CudoVentures/cosmos-gravity-bridge.git ./CudosGravityBridge; \
        git clone --depth 1 --branch cudos-dev https://github.com/CudoVentures/cudos-gravity-bridge-ui ./CudosGravityBridgeUI; \
        git clone --depth 1 --branch cudos-dev https://github.com/CudoVentures/big-dipper.git ./CudosExplorer; \
        git clone --depth 1 --branch cudos-dev https://github.com/CudoVentures/faucet.git ./CudosFaucet; \
    else \
        mv ./source/CudosNode ./CudosNode; \
        mv ./source/CudosBuilders ./CudosBuilders; \
        mv ./source/CudosGravityBridge ./CudosGravityBridge; \
        mv ./source/CudosGravityBridgeUI ./CudosGravityBridgeUI; \
        mv ./source/CudosExplorer ./CudosExplorer; \
        mv ./source/CudosFaucet ./CudosFaucet; \
    fi && \
    rm -rf ./source

CMD ["/bin/bash", "-c", "sudo service ssh start && sleep infinity"]