import ibcTransfer from '../cudos-helpers/ibcTransfer.js';
import config from '../config/config.js';
import { getCudosAddressBalance, getTotalDenomBalance, wait, GREEN, RED } from '../cudos-helpers/utils.js';
import { Cosmos } from "@cosmostation/cosmosjs";
import BigNumber from 'bignum';

const N_ADDRESSES = config.TEST.NUMBER_OF_ADDRESSES;
const N_TESTS = config.TEST.NUMBER_OF_TESTS;
const MAX_ACUDOS_PER_ADDRESS = new BigNumber(config.TEST.MAX_ACUDOS_PER_ADDRESS);

const BLOCKS_TO_WAIT = 5;
const BLOCK_TIME = 7; //in seconds
const FAUCET_FUNDS = MAX_ACUDOS_PER_ADDRESS.mul(N_TESTS + 1).mul(N_ADDRESSES);

async function runTest() {
    // setup
    const cudosProvider_1 = new Cosmos(config.NETWORK_1.REST, config.NETWORK_1.CHAIN_ID);
    cudosProvider_1.setPath("m/44'/118'/0'/0/0");
    cudosProvider_1.bech32MainPrefix = 'cudos'
    const faucetMnemonic_1 = config.NETWORK_1.MNEMONIC.replaceAll("\"", '');
    const cudosFaucetAddress_1 = cudosProvider_1.getAddress(faucetMnemonic_1);

    const cudosFeePerMsg_1 = (new BigNumber(config.NETWORK_1.GAS_PER_MSG)).mul(config.NETWORK_1.GAS_PRICE);
    const cudosBalancePerAddressNeeded_1 = cudosFeePerMsg_1.add(MAX_ACUDOS_PER_ADDRESS);

    const cudosProvider_2 = new Cosmos(config.NETWORK_2.REST, config.NETWORK_2.CHAIN_ID);
    cudosProvider_2.setPath("m/44'/118'/0'/0/0");
    cudosProvider_2.bech32MainPrefix = 'cudos'

    const faucetMnemonic_2 = config.NETWORK_2.MNEMONIC.replaceAll("\"", '');
    const cudosFaucetAddress_2 = cudosProvider_2.getAddress(faucetMnemonic_2);

    const cudosFeePerMsg_2 = (new BigNumber(config.NETWORK_2.GAS_PER_MSG)).mul(config.NETWORK_2.GAS_PRICE);
    const cudosBalancePerAddressNeeded_2 = cudosFeePerMsg_2.add(MAX_ACUDOS_PER_ADDRESS);

    // checks for enough faucet balances
    const cudosFaucetBalance_1 = await getCudosAddressBalance(cudosFaucetAddress_1, config.NETWORK_1.REST);
    const cudosFaucetBalanceNeeded_1 = cudosBalancePerAddressNeeded_1.add(cudosFeePerMsg_1).mul(N_ADDRESSES*N_TESTS).add(FAUCET_FUNDS);
    if (cudosFaucetBalance_1.lt(cudosFaucetBalanceNeeded_1)) {
        console.log(RED, `Not enough acudos balance in CUDOS faucet - needed ${cudosFaucetBalanceNeeded_1.toString()}acudos, got ${cudosFaucetBalance_1.toString()}acudos`);
        return;
    }

    const cudosFaucetBalance_2 = await getCudosAddressBalance(cudosFaucetAddress_2, config.NETWORK_2.REST);
    const cudosFaucetBalanceNeeded_2 = cudosBalancePerAddressNeeded_2.add(cudosFeePerMsg_2).mul(N_ADDRESSES*N_TESTS).add(FAUCET_FUNDS);
    if (cudosFaucetBalance_2.lt(cudosFaucetBalanceNeeded_2)) {
        console.log(RED, `Not enough acudos balance in CUDOS faucet - needed ${cudosFaucetBalanceNeeded_2.toString()}acudos, got ${cudosFaucetBalance_2.toString()}acudos`);
        return;
    }

    // fund some cudos addresses
    const fundedCudosMnemonics = [];
    const fundedCudosAddresses = [];
    for (let i = 0; i < N_ADDRESSES; i++) {
        const mnemonic = cudosProvider_1.getRandomMnemonic();
        const address = cudosProvider_1.getAddress(mnemonic);
        fundedCudosMnemonics.push(mnemonic); 
        fundedCudosAddresses.push(address);
    }

    //fund addressed to be used for ibc denom => acudos sends
    console.log(GREEN, 'Funding ibcDenom faucets...')
    console.log(GREEN, "Sending acudos to denom faucet on network 1...");
    await ibcTransfer(config.NETWORK_1, faucetMnemonic_1, [cudosFaucetAddress_2], 'acudos', new BigNumber(FAUCET_FUNDS));

    console.log(GREEN, "Sending acudos to denom faucet on network 2...");
    await ibcTransfer(config.NETWORK_2, faucetMnemonic_2, [cudosFaucetAddress_1], 'acudos', new BigNumber(FAUCET_FUNDS));

    await wait(BLOCKS_TO_WAIT * BLOCK_TIME, 'Waiting ibcDenom funds to pass...');

    // const ibcDenom_1 = await getIbcDenom(ibcFaucet_1, config.NETWORK_1.REST);
    // const ibcDenom_2 = await getIbcDenom(ibcFaucet_2, config.NETWORK_2.REST);
    const ibcDenom_1 = config.NETWORK_1.IBC_DENOM;
    const ibcDenom_2 = config.NETWORK_2.IBC_DENOM;


    await checkBalances(ibcDenom_1, ibcDenom_2);

    for(let i = 0; i < N_TESTS; i++){

        console.log(GREEN, "Creating IBC Transfer txs");

        try {
            console.log(GREEN, "Sending acudos to network 1...");
            await ibcTransfer(config.NETWORK_2, faucetMnemonic_2, fundedCudosAddresses, 'acudos', MAX_ACUDOS_PER_ADDRESS);

            console.log(GREEN, "Sending acudos to network 2...");
            await ibcTransfer(config.NETWORK_1, faucetMnemonic_1, fundedCudosAddresses, 'acudos', MAX_ACUDOS_PER_ADDRESS);

            console.log(GREEN, `Sending ${ibcDenom_1} to network 1...`);
            await ibcTransfer(config.NETWORK_2, faucetMnemonic_2, fundedCudosAddresses, ibcDenom_2, MAX_ACUDOS_PER_ADDRESS);

            console.log(GREEN, `Sending ${ibcDenom_2} to network 2...`);
            await ibcTransfer(config.NETWORK_1, faucetMnemonic_1, fundedCudosAddresses, ibcDenom_1, MAX_ACUDOS_PER_ADDRESS);
        } catch (e) {
            console.log(RED, e);
        }

        await checkBalances(ibcDenom_1, ibcDenom_2);
    }

    await wait(BLOCKS_TO_WAIT * BLOCK_TIME, 'to be sure the txs pass...');

    await checkBalances(ibcDenom_1, ibcDenom_2);
};

async function checkBalances(ibcDenom_1, ibcDenom_2){

    const currentIbcModuleBalance_1 = await getCudosAddressBalance(config.NETWORK_1.IBC_MODULE_ADDRESS, config.NETWORK_1.REST);
    const currentIbcModuleBalance_2 = await getCudosAddressBalance(config.NETWORK_2.IBC_MODULE_ADDRESS, config.NETWORK_2.REST);

    const currentTotalIbcDenomBalance_1 = await getTotalDenomBalance(ibcDenom_1, config.NETWORK_1.REST);
    const currentTotalIbcDenomBalance_2 = await getTotalDenomBalance(ibcDenom_2, config.NETWORK_2.REST);

    console.log('--------------------------------------------------------------------');
    console.log(GREEN, `Current network 1 IBC module balance: ${currentIbcModuleBalance_1.toString()} acudos`);
    console.log(GREEN, `Current network 2 IBC denom balance: ${currentTotalIbcDenomBalance_2.toString()} ${ibcDenom_2.toString()}`);
    console.log('--------------------------------------------------------------------');
    console.log(GREEN, `Current network 2 IBC module balance: ${currentIbcModuleBalance_2.toString()} acudos`);
    console.log(GREEN, `Current network 1 IBC denom balance: ${currentTotalIbcDenomBalance_1.toString()} ${ibcDenom_1.toString()}`);
    console.log('--------------------------------------------------------------------');

    let error = false;

    if(!currentIbcModuleBalance_1.eq(currentTotalIbcDenomBalance_2)){
        console.log(RED, `ERROR: IBC module balance on chain 1 does not match  the IBC denom amount minted on chain 2: module has ${currentIbcModuleBalance_1} and chain 1 has ${currentTotalIbcDenomBalance_2}`)
        error = true;
    } 
    
    if(!currentIbcModuleBalance_2.eq(currentTotalIbcDenomBalance_1)){
        console.log(RED, `ERROR: module balance on chain 2 does not match  the IBC denom amount minted on chain 1: module has ${currentIbcModuleBalance_2} and chain 1 has ${currentTotalIbcDenomBalance_1}`)
        error = true;
    }

    if(!error){
        console.log(GREEN, "Ibc balances match so far");
    }
}

runTest();