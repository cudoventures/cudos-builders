FROM ethereum/client-go:v1.10.4

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME

RUN if [ $USER_NAME != 'root' ]; then \
        addgroup -g ${GROUP_ID} $GROUP_NAME; \
        adduser -D -g "" -u ${USER_ID} -G ${GROUP_NAME} ${USER_NAME}; \
    fi

RUN apk add --no-cache curl bash && \
    mkdir -p /var/ethereum && \
    chown -R ${USER_NAME}:${GROUP_NAME} /var/ethereum

ENV USER_NAME=${USER_NAME}
ENV GROUP_NAME=${GROUP_NAME}
ENV CUDOS_HOME=${CUDOS_HOME}

ENTRYPOINT chown -R ${USER_NAME}:${GROUP_NAME} /var/ethereum && su ${USER_NAME} -c "geth --rinkeby -datadir '/var/ethereum' --syncmode 'fast' --http --http.port '8545' --http.addr '0.0.0.0' --http.corsdomain '*' --http.vhosts '*' --http.api personal,eth,net,web3"
