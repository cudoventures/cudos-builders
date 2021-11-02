FROM grafana/grafana-enterprise:8.2.0-ubuntu

ARG USER_ID

USER root

RUN if [ $USER_ID != '0' ]; then \
        usermod -u ${USER_ID} grafana; \
    fi && \
    chsh -s/bin/bash grafana

ENTRYPOINT [ "" ]

CMD ["/bin/bash", "-c", "chown -R grafana:root /var/lib/grafana && su grafana -c \"export PATH='/usr/share/grafana/bin:$PATH' && /run.sh\""]