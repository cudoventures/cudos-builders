FROM rust:1.70-buster

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME

RUN apt-get update

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -gid ${GROUP_ID} $GROUP_NAME; \
        adduser --disabled-password -gecos "" -uid ${USER_ID} -gid ${GROUP_ID} ${USER_NAME}; \
    fi

WORKDIR /usr/local/src/hermes

RUN cargo install ibc-relayer-cli --version 1.6.0 --bin hermes --locked

CMD ["sleep", "infinity"]
