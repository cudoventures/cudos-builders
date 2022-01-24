# How to use the deployment script:
## Local dev environment
NOTE: Requires a running cudos-node instance !
1. Setup the configuration files:
   - From dev-configs to root of explorer-v2 folder:
       - Copy and Rename bdjuno-sample to bdjuno
         - Inside this folder replace the genesis.example.json with your local node genesis.json (located in cudos-data/config)
       - Copy and Rename .env-bdjuno.sample to .env.bdjuno
       - Copy Rename .env-big-dipper-2.sample to .env-big-dipper-2
2. Call the script with  ``` ./deploy.sh dev http://localhost:8080 myadminsecret```

## Testnet environment
### This deploys everything without the POSTGRES DB because in prod it is on a different server
1. Setup the configuration files:
   - From public-testnet-configs( or private-testnet-configs ) to root of explorer-v2 folder:
       - Copy and Rename bdjuno-sample to bdjuno
       - Copy and Rename .env-bdjuno.sample to .env.bdjuno
       - Copy and Rename .env-big-dipper-2.sample to .env-big-dipper-2
2. Go over the configs and check if the parameters are right(IP of the node, Hasura URL, Db names, etc)
2. Call the script with  ``` ./deploy.sh prod HASURA_URL HASURA_SECRET_KEY```


## Testnet/Mainnet deployment guide
1. Provision new SQL instance in gcloud SQL
   - must have public IP address enabled
2. Create a new database in the SQL instance (public-testnet-explorer-v2 / private-testnet-exporer-v2)
3. Connect to this instance from your local machine and execute the scripts inside cudos-bdjuno/database/examples/big_dipper_2_init_script_combined.sql
    - Connection can be made through [gcloud sql auth proxy](https://cloud.google.com/sql/docs/postgres/connect-admin-proxy) through your favorite database explorer
  
TOD..

4. Provision new Compute Engine instance in gcloud:
    - RAM has to be >= 8 GB
5. 
