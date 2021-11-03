FROM binary-builder

COPY ./CudosBuilders/docker/full-node/config-full-node.sh ./

COPY ./CudosBuilders/docker/config ./external-config

RUN chmod +x ./config-full-node.sh && \
    sed -i 's/\r$//' ./config-full-node.sh

CMD ["/bin/bash", "-c", "./config-full-node.sh"]
