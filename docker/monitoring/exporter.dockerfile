FROM alpine:latest

ARG NODE_ADDR
ARG TENDERMINT_ADDR

RUN mkdir /home/cudos

WORKDIR /home/cudos

RUN wget https://github.com/CudoVentures/cosmos-exporter/releases/download/v0.2.1/cosmos-exporter_0.2.1_Linux_x86_64.tar.gz \
    && tar -xzf cosmos-exporter_0.2.1_Linux_x86_64.tar.gz \
    && chmod +x ./cosmos-exporter

CMD /home/cudos/cosmos-exporter --bech-prefix cuods --denom cudos --listen-address 0.0.0.0:9300 --node ${NODE_ADDR} --tendermint-rpc ${TENDERMINT_ADDR}