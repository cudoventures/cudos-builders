FROM prom/prometheus

ARG PROMETHEUS_CONFIG_PATH_LOCAL

COPY ${PROMETHEUS_CONFIG_PATH_LOCAL} /etc/prometheus/prometheus.yml
