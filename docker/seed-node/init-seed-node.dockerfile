FROM golang:buster

# RUN apk add --no-cache jq make bash g++

RUN apt update

RUN apt install -y jq build-essential

WORKDIR /usr/cudos

COPY ./CudosNode ./

COPY ./CudosBuilders/docker/seed-node/init-seed.sh ./

COPY ./CudosBuilders/docker/config ./external-config

RUN make && \
    chmod +x ./init-seed.sh && \
    sed -i 's/\r$//' ./init-seed.sh

# CMD ["sleep", "infinity"]
CMD ["/bin/bash", "./init-seed.sh"]
