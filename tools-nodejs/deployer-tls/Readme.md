Install TLS cert on the server that contains the docker

https://certbot.eff.org/lets-encrypt/debianbuster-other

1. On the host machine install "snapd"
``
 sudo apt update
 sudo apt install snapd
``
2. Ensure that your version of snapd is up to date
``
sudo snap install core; sudo snap refresh core
``
3. Install Certbot
``
sudo snap install --classic certbot
``
4. Prepare the Certbot command
``
sudo ln -s /snap/bin/certbot /usr/bin/certbot
``

5. Run Certbot to obtain certificate
``
sudo certbot certonly --standalone
``

--- 
Update .arg files for docker with correct domain

TLS_ENABLED=true
TLS_HOST_PATH=/etc/letsencrypt
TLS_DOMAIN=domain_for_server
TLS_DOCKER_PATH=/etc/letsencrypt

With the init command of the sentry the address will be set.
