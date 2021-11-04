FROM binary-builder

ARG CUDOS_HOME

ENV CUDOS_HOME=${CUDOS_HOME}

CMD ["/bin/bash", "-c", "cudos-noded start"] 