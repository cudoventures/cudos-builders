FROM golang:buster

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME
ARG CUDOS_HOME

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -gid ${GROUP_ID} $GROUP_NAME; \
        adduser --disabled-password -gecos "" -uid ${USER_ID} -gid ${GROUP_ID} ${USER_NAME}; \
    fi

RUN apt-get update
RUN apt-get install jq -y

# WORKDIR /usr/src/IbcRelayer

# RUN make install

WORKDIR /home/IbcRelayer

COPY ./CudosBuilders/docker/ibc-relayer/chain_a_config.json .
COPY ./CudosBuilders/docker/ibc-relayer/chain_b_config.json .
COPY ./CudosBuilders/docker/ibc-relayer/ibc-relayer-run.sh .

RUN chmod +x ./ibc-relayer-run.sh && \
    chown -R ${USER_NAME}:${GROUP_NAME} ./ && \
    sed -i 's/\r$//' ./ibc-relayer-run.sh

USER ${USER_NAME}:${GROUP_NAME}

ENV CUDOS_HOME=${CUDOS_HOME}


CMD ["sleep", "infinity"]

# CMD ["/bin/bash", "-c", "./ibc-relayer-run.sh"]
