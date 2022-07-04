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

RUN apt-get install git build-essential ufw curl jq snapd cargo wget liblz4-tool aria2 -y

WORKDIR ${OSMOSIS_HOME}

RUN git clone https://github.com/osmosis-labs/osmosis && \
    cd osmosis && \
    git checkout V10.0.0-testnet && \
    make install

CMD ["sleep", "infinity"]
