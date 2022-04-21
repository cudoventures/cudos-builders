FROM golang:buster

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME
ARG TESTER_HOME

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -gid ${GROUP_ID} $GROUP_NAME; \
        adduser --disabled-password -gecos "" -uid ${USER_ID} -gid ${GROUP_ID} ${USER_NAME}; \
    fi

WORKDIR ${TESTER_HOME}

RUN apt-get update

RUN git clone https://github.com/informalsystems/tm-load-test.git TendermintLoadTester && \
    cd TendermintLoadTester && \
    git checkout v1.0.0 && \
    make

CMD ["/bin/bash", "-c", "./TendermintLoadTester/build/tm-load-test -c ${CONNECTIONS} -T ${DURATION} -r ${TX_RATE} -s ${TX_SIZE} \
    --endpoints ${ENDPOINTS} \
    --stats-output ${TESTER_HOME}/stats.csv"];