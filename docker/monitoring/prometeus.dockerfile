FROM ubuntu/prometheus

ARG USER_ID
ARG USER_NAME
ARG GROUP_ID
ARG GROUP_NAME

RUN if [ $USER_ID != '0' ]; then \
        groupadd --gid ${GROUP_ID} ${GROUP_NAME}; \
        useradd --no-log-init --create-home --shell /bin/bash --uid ${USER_ID} --gid ${GROUP_ID} ${USER_NAME}; \
    fi


ENV USER_NAME=${USER_NAME}

ENTRYPOINT [ "" ]

CMD ["/bin/bash", "-c", "chown -R ${USER_NAME}:${GROUP_NAME} /prometheus && su ${USER_NAME} -c \"prometheus --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/prometheus --web.console.libraries=/usr/share/prometheus/console_libraries --web.console.templates=/usr/share/prometheus/consoles\""]
