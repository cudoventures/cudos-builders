# How to use the deployment script:
## Local dev environment
NOTE: Requires a running cudos-node instance !
1. Setup the configuration files:
   - From dev-configs to root of explorer-v2 folder:
       - Copy and Rename bdjuno-sample to bdjuno
         - Inside this folder replace the genesis.example.json with your local node genesis.json (located in cudos-data/config)
       - Copy and Rename .env-bdjuno.sample to .env-bdjuno
       - Copy Rename .env-big-dipper-2.sample to .env-big-dipper-2
2. Call the script with  ``` ./deploy.sh dev http://localhost:8080 myadminsecret```

## Testnet/Mainnet deployment guide
1. Provision new SQL instance in gcloud SQL
   - must have public IP address enabled
2. Create a new database in the gcloud SQL instance (public-testnet-explorer-v2 / private-testnet-exporer-v2)
3. Connect to this instance from your local machine 
    - Connection can be made through [gcloud sql auth proxy](https://cloud.google.com/sql/docs/postgres/connect-admin-proxy) through your favorite database explorer / psql console
4. Once connected to the  DB and execute the DB init sciprt: big_dipper_2_init_script_combined
5. Provision new Compute Engine instance in gcloud
    - RAM has to be >= 8 GB   
    - Tag your instance, for example : private-testnet-explorer-v2-vm
    - In dentity and API access tab / Access Scopes / choose "Set access for each API" and from the dropdown for "Cloud SQL" choose enable. 
6. White list the GCE VM IP to gcloud SQL Instance ( this is so because hasura is making requests directly to the IP and cannot go over sql auth proxy)
    - GSQL Instance => Connections => Networking => Authorized Networks => Add the public IP of the GCE instance
    - In the Connectivity Test tab try to make a test from the VM to GSQL on port 5432, should be reachable
7. Expose PORT 3000,5000,8080 for the outside world:
      - Go to cloud.google.com
      - Go to my Console
      - Choose your Project
      - Choose Networking > VPC network
      - Choose "Firewall"
      - Choose "Create Firewall Rule"
      - To apply the rule to select VM instances, select Targets > "Specified target tags", and enter into "Target tags" the name of the tag ( private-testnet-explorer-v2-vm for example ). This tag will be used to apply the new firewall rule onto whichever instance you'd like. Then, make sure the instances have the network tag applied.
      - Set Source IP ranges to allow traffic from all IPs: 0.0.0.0/0
      - To allow incoming TCP connections to port 3000,5000,8080, in "Protocols and Ports", check "tcp" and enter 3000,5000,8080
      - Click Create (or click “Equivalent Command Line” to show the gcloud command to create the same rule)
8.  Create a new folder and inside it place the relevant configs(depending in the where you are deploying)
    - From the relevant folder(private/public) to the new folder:
      - Copy and Rename bdjuno-sample to bdjuno
        - Rename genesis file without .example
      - Copy and Rename .env-bdjuno.sample to .env-bdjuno
      - Copy and Rename .env-big-dipper-2.sample to .env-big-dipper-2
9. Go over the configs and check if the parameters are right (IP of the node, Hasura URL, Db names, etc)
       - Please note that HASURA_GRAPHQL_DATABASE_URL requires the real IP address:port of the SQL DB
10.  Copy the deploy.sh script from explorer-v2 to the new folder
11.  Copy the new folder to the [VM via SSH](https://cloud.google.com/sdk/gcloud/reference/compute/scp) 
12. [Install Docker on the VM](https://docs.docker.com/engine/install/) and [Install docker-compose](https://docs.docker.com/compose/install/)
13. Inside the VM place to the newly copied folder and call them like ``` ./deploy.sh prod HASURA_URL HASURA_SECRET_KEY```
   - Hasura URL and Secret Key should be the same as the ones defined in .env-bdjuno : HASURA_GRAPHQL_ADMIN_SECRET and HASURA_GRAPHQL_ENDPOINT_URL
   - This will pull, build and deploy the latest code for both cudos-bdjuno and big-dipper-2 and deploy it via docker to the specified instance using the configs you provided
14. Delete the newly created folder that you transfered to the server

TODO: Create STATIC IP for both SQL and 
## Additional:

### More info about gcloud sql proxy: 
Note: This is not needed as the auth proxy is running in docker
1.  Setup [gcloud sql auth proxy](https://cloud.google.com/sql/docs/postgres/connect-admin-proxy) on the remote GCE instance (so the BDJuno can have secure SSL connection to gcloud SQL)
    - On the remote machine do the following: https://www.jhanley.com/google-cloud-sql-proxy-installing-as-a-service-on-gce/
    - ```wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O cloud_sql_proxy```
    - ```chmod +x cloud_sql_proxy```
2. You can also run gcloud sql proxy as a service: ( right now it is ran from a docker container inside the bdjuno docker-compose file)
    - Create a new file named cloud-sql-proxy.service and paste into it the following: 
    ```
    [Unit]
    Description=Connecting MySQL Client from Compute Engine using the Cloud SQL Proxy
    Documentation=https://cloud.google.com/sql/docs/mysql/connect-compute-engine
    Requires=networking.service
    After=networking.service
    
    [Service]
    WorkingDirectory=/usr/local/bin
    ExecStart=/usr/local/bin/cloud_sql_proxy -dir=/cloudsql -instances=INSTANCE_CONNECTION_NAME
    Restart=always
    StandardOutput=journal
    User=root
    
    [Install]
    WantedBy=multi-user.target
    ```
    - Copy this file to /etc/systemd/system/cloud-sql-proxy.service: 
        - ```sudo cp cloud-sql-proxy.service /etc/systemd/system/cloud-sql-proxy.service```
    - Enable the Cloud SQL Proxy to autostart when the Compute Engine starts:
        - ``` sudo systemctl enable cloud-sql-proxy.service ```
    - Reboot your Compute Engine instance and verify that the service is running after restart:
        - ```sudo systemctl status cloud-sql-proxy.service```
