FROM debian:buster

ARG USER_NAME="cudos"
ARG GROUP_NAME="cudos"
ARG PASS="cudos"
ARG DOCKER_GROUP_ID

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
    adduser --disabled-password -gecos "" ${USER_NAME} && \
    usermod -a -G ${GROUP_NAME} ${USER_NAME} && \
    usermod -a -G docker ${USER_NAME} && \
    usermod -a -G sudo ${USER_NAME} && \
    echo "$USER_NAME:$PASS" | chpasswd && \
    echo "root:$PASS" | chpasswd && \
    echo "${USER_NAME} ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers && \
    mkdir -p /usr/cudos && \
    chown ${USER_NAME}:${GROUP_NAME} /usr/cudos

USER cudos

WORKDIR /usr/cudos

RUN git clone --depth 1 --branch v0.2 https://github.com/CudoVentures/cudos-node.git CudosNode && \
    git clone --depth 1 --branch v0.3 https://github.com/CudoVentures/cudos-builders.git CudosBuilders && \
    git clone --depth 1 --branch v0.2 https://github.com/CudoVentures/cosmos-gravity-bridge.git CudosGravityBridge

CMD ["/bin/bash", "-c", "sudo service ssh start && sleep infinity"]