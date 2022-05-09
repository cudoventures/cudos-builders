FROM rust:1.60-buster

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -gid ${GROUP_ID} $GROUP_NAME; \
        adduser --disabled-password -gecos "" -uid ${USER_ID} -gid ${GROUP_ID} ${USER_NAME}; \
    fi

WORKDIR /usr/hermes

RUN apt-get update

RUN apt-get install cargo -y

RUN cargo install ibc-relayer-cli --version 0.14.0 --bin hermes --locked

CMD ["sleep", "infinity"]
