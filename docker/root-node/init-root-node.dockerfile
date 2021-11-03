FROM binary-builder

RUN apt update && apt install -y jq

COPY ./CudosBuilders/docker/root-node/init-root.sh ./

RUN chmod +x ./init-root.sh && \
    sed -i 's/\r$//' ./init-root.sh

CMD ["/bin/bash", "-c", "./init-root.sh"]
