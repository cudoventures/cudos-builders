# Monitoring

### Running
Development

docker-compose --env-file ./monitoring.local.arg -f ./monitoring.yml -p cudos-monitoring-local up

Production

1. Start on gcloud production server
 
cd /home/cudos

cp ./config/prometheus.tesnet.public.yml /mnt/disks/prometheus-data/prometheus.yml

docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$PWD:$PWD" \
    -w="$PWD" \
    docker/compose:1.29.0 -f ./monitoring.yml -p cudos-monitoring --env-file ./monitoring.tesnet.public.arg  up -d


### After starting 

Go to http://server_ip:3000 and log in into grafana:

For dev credentials:
- User: admin
- Pass: admin


Add prometheus data source into grafana http://prometheus_ip:9090 

Add Dashboard


