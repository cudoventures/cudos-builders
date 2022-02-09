# How to use the deployment script:
## Local dev environment
NOTE: Requires a running cudos-node instance !
### BDJuno + Hasura + PostgresSQL local deployment:
  - Create a new folder named bdjuno_local_deploy
   - Inside it copy the configs from local-dev-configs/bdjuno-dev-sample
     - Rename bdjuno-sample folder to bdjuno
       - Inside this folder replace the genesis.example.json with your local node genesis.json (located in cudos-data/config)
       - Copy and Rename .env-bdjuno.sample to .env-bdjuno
   - Inside it copy the bd-juno-deploy.sh from the root of explorer-v2 
   - Call the new script like this ```./bdjuno-deploy.sh dev http://localhost:8080 myadminsecret```
   - Delete the folder bdjuno_local_deploy
### Big-Dipper-UI-2 Local deploy:
   - Create a new folder named big_dipper_local_deploy
   - Inside it copy .env-dev-big-dipper-2.sample from local-dev-configs
   - Rename the file to .env-big-dipper-2
   - Call the script like ```./big-dipper-2-ui-deploy.sh dev```
   - Delete the big_dipper_local_deploy folder


## Testnet/Mainnet deployment guide
### If you are only redeploying on an already existing instance - please skip to 5.4 or 6.3
1. Provision new SQL instance in gcloud SQL ( or connect to an already created one)
   - must have public IP address enabled
2. Create a new database in the gcloud SQL instance (public-testnet-explorer-v2 / private-testnet-exporer-v2)
3. Connect to this instance from your local machine 
    - Connection can be made through [gcloud sql auth proxy](https://cloud.google.com/sql/docs/postgres/connect-admin-proxy) through your favorite database explorer / psql console
4. Once connected to the  DB and execute the DB init sciprt: big_dipper_2_init_script_combined
5. Provision new Compute Engine instance in gcloud for BDJuno/Parser
       - RAM has to be >= 8 GB   
       - Set book disk to 100 GB
   1. Tag your instance(Networking => Network tags), for example : private-testnet-gql / public-testnet-gql
   2. In dentity and API access tab / Access Scopes / choose "Set access for each API" and from the dropdown for "Cloud SQL" choose enable. 
   3. [Create a static IP address for your GCE Instance](https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address)
   4. Create the instance 
   5. White list the GCE VM IP to gcloud SQL Instance ( this is so because hasura is making requests directly to the IP and cannot go over sql auth proxy)
       - GSQL Instance => Connections => Networking => Authorized Networks => Add the public ( static one ) IP of the GCE instance
       - In the Connectivity Test tab try to make a test from the VM to GSQL on port 5432, should be reachable
   6. Expose PORT 5000,8080 for the outside world: ( Explorer-v2-ui calls this )
         - Go to cloud.google.com
         - Go to my Console
         - Choose your Project
         - Choose Networking > VPC network
         - Choose "Firewall"
         - Choose "Create Firewall Rule"
         - To apply the rule to select VM instances, select Targets > "Specified target tags", and enter into "Target tags" the name of the tag ( private-testnet-gql for example ). This tag will be used to apply the new firewall rule onto whichever instance you'd like. Then, make sure the instances have the network tag applied.
         - Set Source IP ranges to allow traffic from all IPs: 0.0.0.0/0
         - To allow incoming TCP connections to port 5000,8080, in "Protocols and Ports", check "tcp" and enter 5000,8080
         - Click Create (or click “Equivalent Command Line” to show the gcloud command to create the same rule)
   7.  Create a new folder named bdjuno_gql_deploy and inside it place the relevant configs(depending on the environment)
       - From the relevant folder(private/public) to the new folder:
         - Copy and Rename bdjuno-sample to bdjuno
           - Rename genesis file to genesis.json
         - Copy and Rename .env-bdjuno.sample to .env-bdjuno
   8.  Go over the configs and check if the parameters are right (IP of the node, Hasura URL, Db names, etc)
          - Please note that HASURA_GRAPHQL_DATABASE_URL requires the real IP address:port of the SQL DB
   9.   Copy the bdjuno-deploy.sh script from explorer-v2 to the new folder
   10.  Copy the new folder bdjuno_gql_deploy to the [new VM via SSH](https://cloud.google.com/sdk/gcloud/reference/compute/scp) 
   11. [Install Docker on the VM](https://docs.docker.com/engine/install/) and [Install docker-compose](https://docs.docker.com/compose/install/)
   12. Inside the VM change dir to the newly copied folder and deploy BDJuno/Hasura like ``` ./bdjuno-deploy.sh prod HASURA_URL HASURA_SECRET_KEY``` 
      - Hasura URL and Secret Key should be the same as the ones defined in .env-bdjuno : HASURA_GRAPHQL_ADMIN_SECRET and HASURA_GRAPHQL_ENDPOINT_URL
      - This will pull, build and deploy the latest code for cudos-bdjuno and deploy it via docker to the specified instance using the configs you provided
   13. Delete the newly created folder that you transfered to the server on both local and remote
6. Provision new Compute Engine instance in gcloud for Explorer-v2 UI
       - RAM has to be >= 8 GB   
       - Tag your instance, for example : private-testnet-explorer-v2-ui / public-testnet-explorer-v2-ui
   1. [Create a static IP address for your GCE Instance](https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address)
   2. Expose PORT 3000 for the outside world:
         - Go to cloud.google.com
         - Go to my Console
         - Choose your Project
         - Choose Networking > VPC network
         - Choose "Firewall"
         - Choose "Create Firewall Rule"
         - To apply the rule to select VM instances, select Targets > "Specified target tags", and enter into "Target tags" the name of the tag ( private-testnet-gql for example ). This tag will be used to apply the new firewall rule onto whichever instance you'd like. Then, make sure the instances have the network tag applied.
         - Set Source IP ranges to allow traffic from all IPs: 0.0.0.0/0
         - To allow incoming TCP connections to port 3000, in "Protocols and Ports", check "tcp" and enter 3000
         - Click Create (or click “Equivalent Command Line” to show the gcloud command to create the same rule)
   3.  Create a new folder named explorer-v2-ui-deploy and inside it place the relevant configs(depending on the environment)
       - From the relevant folder(private/public) to the new folder:
         - Copy and Rename .env-big-dipper-2.sample to .env-big-dipper-2
   4.  Go over the configs and check if the parameters are right (IP of the node, Hasura URL, Db names, etc)
   5.  Copy the big-dipper-2-ui-deploy.sh script from explorer-v2 to the new folder
   6.  Copy the new folder explorer-v2-ui-deploy to the [new VM via SSH](https://cloud.google.com/sdk/gcloud/reference/compute/scp) 
   7.  [Install Docker on the VM](https://docs.docker.com/engine/install/) and [Install docker-compose](https://docs.docker.com/compose/install/)
   8.  Inside the VM change dir to the newly copied folder and deploy BDJuno/Hasura like ```./big-dipper-2-ui-deploy.sh prod```
      - This will pull, build and deploy the latest code for abig-dipper-2 and deploy it via docker to the specified instance using the configs you provided
   9.  Delete the newly created folder that you transfered to the server on both local and remote

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

### Configuration explanation:
1. There are 3 configs that have to be set up: 
    - Inside the BDJuno folder you have:
        - config.yaml - this is the config for the BDJuno - https://docs.bigdipper.live/cosmos-based/parser/config/config
          - ip address of node, db name and password are set here
        - genesis.json - this is the genesis file that is going to be parsed before BDJuno starts. It gets by the docker BDJuno docker file
    - .env-bdjuno - this is the env variables for the BDJuno docker 
      - set db connection string / password here 
      - set hasura console password here  
    - .env-big-dipper-2 - this is the env variables 