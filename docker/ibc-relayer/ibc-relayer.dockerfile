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

WORKDIR /usr/src/IbcRelayer

COPY ../IbcRelayer /usr/src/IbcRelayer/

RUN make install

WORKDIR /home/IbcRelayer

COPY ./CudosBuilders/docker/ibc-relayer/chains ./chains
COPY ./CudosBuilders/docker/ibc-relayer/paths ./paths
COPY ./CudosBuilders/docker/ibc-relayer/scripts ./scripts

RUN chmod +x ./scripts/* && \
    chown -R ${USER_NAME}:${GROUP_NAME} ./ && \
    sed -i 's/\r$//' ./scripts/ibc-relayer-run.sh

ENV USER_NAME=${USER_NAME}
ENV GROUP_NAME=${GROUP_NAME}
ENV CUDOS_HOME=${CUDOS_HOME}


CMD ["/bin/bash", "-c", "chown -R ${USER_NAME}:${GROUP_NAME} ${CUDOS_HOME} && cd ./scripts && ibc-relayer-run.sh"] 
