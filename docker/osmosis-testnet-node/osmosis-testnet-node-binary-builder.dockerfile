FROM golang:buster

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME
ARG OSMOSIS_HOME

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -gid ${GROUP_ID} $GROUP_NAME; \
        adduser --disabled-password -gecos "" -uid ${USER_ID} -gid ${GROUP_ID} ${USER_NAME}; \
    fi

RUN apt-get update

RUN apt-get install git build-essential ufw curl jq snapd cargo -y

WORKDIR ${OSMOSIS_HOME}

RUN git clone https://github.com/osmosis-labs/osmosis && \
    cd osmosis && \
    git checkout v4.2.0 && \
    make install

RUN git clone https://github.com/cosmos/cosmos-sdk && \
    cd cosmos-sdk && \
    git checkout v0.42.9 && \
    make cosmovisor && \
    cp cosmovisor/cosmovisor $GOPATH/bin/cosmovisor

RUN mkdir -p cosmovisor && \
    mkdir -p cosmovisor/genesis && \
    mkdir -p cosmovisor/genesis/bin && \
    mkdir -p cosmovisor/upgrades

RUN echo "# Setup Cosmovisor" >> ~/.profile && \
    echo "export DAEMON_NAME=osmosisd" >> ~/.profile && \
    echo "export DAEMON_HOME=$OSMOSIS_HOME" >> ~/.profile && \
    echo "export DAEMON_ALLOW_DOWNLOAD_BINARIES=false" >> ~/.profile && \
    echo "export DAEMON_LOG_BUFFER_SIZE=512" >> ~/.profile && \
    echo "export DAEMON_RESTART_AFTER_UPGRADE=true" >> ~/.profile && \
    source ~/.profile

CMD ["sleep", "infinity"]
