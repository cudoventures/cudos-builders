FROM binary-builder

ARG CUDOS_HOME

ENV CUDOS_HOME=${CUDOS_HOME}

# COPY ./CudosBuilders/docker/root-node/scripts/new-test-proposal.sh ./

# RUN chmod +x ./new-test-proposal.sh && \
#     sed -i 's/\r$//' ./new-test-proposal.sh

# RUN apt-get update

# RUN apt install jq -y

# CMD ["sleep", "infinity"] 
CMD ["/bin/bash", "-c", "cudos-noded start"] 