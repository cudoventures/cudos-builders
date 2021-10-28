# Monitoring

## Development

1. Create "monitoring.local.env" by example of "monitoring.local.env.example", change the ip of the local node of sentry.

2. Check "prometheus.local.yml" IPs of local nodes to match

3. Run monitoring 

``
docker-compose --env-file ./monitoring.local.arg -f ./monitoring.yml -p cudos-monitoring-local up
``

## Production

1. Create source folder 

``
mkdir /home/cudos
``

2. Create folder for data 
```
- /mnt/disks/prometheus-data/grafana
- /mnt/disks/prometheus-data/prometheus
```

3. Copy source of "monitoring" to /home/cudos

4. Run the 
```
docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "$PWD:$PWD" \
    -w="$PWD" \
    docker/compose:1.29.0 -f ./monitoring.yml -p cudos-monitoring --env-file ./monitoring.tesnet.public.arg  up -d
```

## Deploy

You can use command in "tools" folder 

1. Create "secrets.json" in "deployer-monitoring" based on "secrets.json.example" with credentials to the server

2. Run the command to deploy to the server from the tool folder
```
deploy--monitoring-testnet-public
```

## Setup Grafana

1. Log in to grafana with credentials http://localhost_or_server_ip:3000 

``
user: admin
password: admin
``

2. Change admin password

3. Add prometheus data source into grafana http://prometheus_ip:9090 

4. Add Dashboards - Import two dashboards from folder "grafana-dashboards"







