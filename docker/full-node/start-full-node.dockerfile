FROM binary-builder

ARG CUDOS_HOME

ENV CUDOS_HOME=${CUDOS_HOME}

ENV EXTERNAL_ADDRESS=${EXPOSE_IP}:26656

CMD ["/bin/bash", "-c", "cudos-noded start"] 