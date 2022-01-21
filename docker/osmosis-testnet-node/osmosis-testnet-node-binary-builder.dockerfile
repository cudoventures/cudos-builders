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
    git checkout v6.0.0 && \
    make install

CMD ["sleep", "infinity"]
