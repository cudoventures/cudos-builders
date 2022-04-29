import { ibcTransferTx } from '../../cudos/txs';
import { getCudosAddressBalance, getTotalDenomBalance, checkTx, getSigner } from '../../cudos/cudosUtils.js';
import BigNumber from 'bignum';
import wait from '../../utils/wait.js';
import {logSuccess, logError, logGeneral} from '../../utils/logger.js';
import { Cosmos } from "@cosmostation/cosmosjs";

const BLOCKS_TO_WAIT = 10;

export default async function runTest(baseConfig, ibcConfig) {
    // setup
    const N_ADDRESSES = ibcConfig.TEST.NUMBER_OF_ADDRESSES;
    const N_TESTS = ibcConfig.TEST.NUMBER_OF_TESTS;
    const MAX_ACUDOS_PER_ADDRESS = new BigNumber(ibcConfig.TEST.MAX_ACUDOS_PER_ADDRESS);

    const cudosProvider_1 = baseConfig.provider;
    const cudosFaucetAddress_1 = cudosProvider_1.getAddress(baseConfig.faucetMnemonic);

    const cudosFeePerMsg_1 = (new BigNumber(ibcConfig.NETWORK_1.GAS_PER_MSG)).mul(baseConfig.gasPrice);
    const cudosBalancePerAddressNeeded_1 = cudosFeePerMsg_1.add(MAX_ACUDOS_PER_ADDRESS);
    const signer_1 = await getSigner(cudosProvider_1, baseConfig.faucetMnemonic)

    const cudosProvider_2 = new Cosmos(ibcConfig.NETWORK_2.REST, ibcConfig.NETWORK_2.CHAIN_ID);
    cudosProvider_2.setPath("m/44'/118'/0'/0/0");
    cudosProvider_2.bech32MainPrefix = 'cudos';

    const faucetMnemonic_2 = ibcConfig.NETWORK_2.MNEMONIC
    const cudosFaucetAddress_2 = cudosProvider_2.getAddress(faucetMnemonic_2);

    const cudosFeePerMsg_2 = (new BigNumber(ibcConfig.NETWORK_2.GAS_PER_MSG)).mul(ibcConfig.NETWORK_2.GAS_PRICE);
    const cudosBalancePerAddressNeeded_2 = cudosFeePerMsg_2.add(MAX_ACUDOS_PER_ADDRESS);
    const signer_2 = await getSigner(cudosProvider_2, faucetMnemonic_2)

    const ibcDenom_1 = ibcConfig.NETWORK_1.IBC_DENOM;
    const ibcDenom_2 = ibcConfig.NETWORK_2.IBC_DENOM;

    // checks for enough faucet balances
    const cudosFaucetBalance_1 = await getCudosAddressBalance(cudosFaucetAddress_1, baseConfig.rest);
    const cudosFaucetBalanceNeeded_1 = cudosBalancePerAddressNeeded_1.mul(N_ADDRESSES*N_TESTS).mul(4);
    const faucetFunds_1 = cudosFaucetBalanceNeeded_1.div(4);
    if (cudosFaucetBalance_1.lt(cudosFaucetBalanceNeeded_1)) {
        logError(`Not enough acudos balance in CUDOS faucet - needed ${cudosFaucetBalanceNeeded_1.toString()}acudos, got ${cudosFaucetBalance_1.toString()}acudos`);
        return;
    }

    const cudosFaucetBalance_2 = await getCudosAddressBalance(cudosFaucetAddress_2, ibcConfig.NETWORK_2.REST);
    const cudosFaucetBalanceNeeded_2 = cudosBalancePerAddressNeeded_2.mul(N_ADDRESSES*N_TESTS*4);
    const faucetFunds_2 = cudosFaucetBalanceNeeded_2.div(4);
    if (cudosFaucetBalance_2.lt(cudosFaucetBalanceNeeded_2)) {
        logError(`Not enough acudos balance in CUDOS faucet - needed ${cudosFaucetBalanceNeeded_2.toString()}acudos, got ${cudosFaucetBalance_2.toString()}acudos`);
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
    logGeneral('Funding ibcDenom faucets...')

    logGeneral("Sending acudos to denom faucet on network 1...");
    const transferConfig_2 = {
        port: ibcConfig.NETWORK_2.PORT,
        channel: ibcConfig.NETWORK_2.CHANNEL,
        gasPerMsg: ibcConfig.NETWORK_2.GAS_PER_MSG,
        gasPrice: baseConfig.gasPrice,
    }  

    let promise = ibcTransferTx(cudosProvider_2, signer_2, transferConfig_2, [cudosFaucetAddress_1], 'acudos', faucetFunds_2);
    await wait(
        10 * baseConfig.blockTime,
        "For the Tx to pass"
    );

    await checkTx(
        cudosProvider_2.url, 
        promise,
    );

    logGeneral("Sending acudos to denom faucet on network 2...");
    const transferConfig_1 = {
        port: ibcConfig.NETWORK_1.PORT,
        channel: ibcConfig.NETWORK_1.CHANNEL,
        gasPerMsg: ibcConfig.NETWORK_1.GAS_PER_MSG,
        gasPrice: baseConfig.gasPrice,
    } 
    promise = ibcTransferTx(cudosProvider_1, signer_1, transferConfig_1, [cudosFaucetAddress_2], 'acudos', faucetFunds_1);
    await wait( 10 * baseConfig.blockTime, "For the Tx to pass");

    await checkTx(cudosProvider_1.url, promise );

    await wait(BLOCKS_TO_WAIT * baseConfig.blockTime, 'Waiting ibcDenom funds to pass...');

    await checkBalances(baseConfig.rest, ibcConfig.NETWORK_2.REST, ibcConfig.NETWORK_1.IBC_MODULE_ADDRESS, ibcConfig.NETWORK_2.IBC_MODULE_ADDRESS, ibcDenom_1, ibcDenom_2);

    for(let i = 0; i < N_TESTS; i++){
        logGeneral("Creating IBC Transfer txs");

        try {
            logGeneral("Sending acudos to network 1...");
            promise = ibcTransferTx(cudosProvider_2, signer_2, transferConfig_2, fundedCudosAddresses, 'acudos', MAX_ACUDOS_PER_ADDRESS);
            await wait(10 * baseConfig.blockTime, "For the Tx to pass");
            await checkTx(cudosProvider_2.url, promise);

            logGeneral("Sending acudos to network 2...");
            promise = ibcTransferTx(cudosProvider_1, signer_1, transferConfig_1, fundedCudosAddresses, 'acudos', MAX_ACUDOS_PER_ADDRESS);
            await wait(10 * baseConfig.blockTime, "For the Tx to pass");
            await checkTx(cudosProvider_1.url, promise);
            
            logGeneral(`Sending ${ibcDenom_1} to network 1...`);
            promise = ibcTransferTx(cudosProvider_2, signer_2, transferConfig_2, fundedCudosAddresses, ibcDenom_2, MAX_ACUDOS_PER_ADDRESS);
            await wait(10 * baseConfig.blockTime, "For the Tx to pass");
            await checkTx(cudosProvider_2.url, promise);

            logGeneral(`Sending ${ibcDenom_2} to network 2...`);
            promise = ibcTransferTx(cudosProvider_1, signer_1, transferConfig_1, fundedCudosAddresses, ibcDenom_1, MAX_ACUDOS_PER_ADDRESS);
            await wait(10 * baseConfig.blockTime, "For the Tx to pass");
            await checkTx(cudosProvider_1.url, promise);
        } catch (e) {
            logError(e);
        }

        //await checkBalances(baseConfig.rest, ibcConfig.NETWORK_2.REST, ibcConfig.NETWORK_1.IBC_MODULE_ADDRESS, ibcConfig.NETWORK_2.IBC_MODULE_ADDRESS, ibcDenom_1, ibcDenom_2);
    }

    await wait(BLOCKS_TO_WAIT * baseConfig.blockTime, 'to be sure the txs pass...');

    await checkBalances(baseConfig.rest, ibcConfig.NETWORK_2.REST, ibcConfig.NETWORK_1.IBC_MODULE_ADDRESS, ibcConfig.NETWORK_2.IBC_MODULE_ADDRESS, ibcDenom_1, ibcDenom_2);
};

async function checkBalances(rest_1, rest_2, ibcModuleAddress_1, ibcModuleAddress_2, ibcDenom_1, ibcDenom_2){
    const currentIbcModuleBalance_1 = await getCudosAddressBalance(ibcModuleAddress_1, rest_1);
    const currentIbcModuleBalance_2 = await getCudosAddressBalance(ibcModuleAddress_2, rest_2);

    const currentTotalIbcDenomBalance_1 = await getTotalDenomBalance(ibcDenom_1, rest_1);
    const currentTotalIbcDenomBalance_2 = await getTotalDenomBalance(ibcDenom_2, rest_2);

    logGeneral('--------------------------------------------------------------------');
    logGeneral(`Current network 1 IBC module balance: ${currentIbcModuleBalance_1.toString()} acudos`);
    logGeneral(`Current network 2 IBC denom balance: ${currentTotalIbcDenomBalance_2.toString()} ${ibcDenom_2.toString()}`);
    logGeneral('--------------------------------------------------------------------');
    logGeneral(`Current network 2 IBC module balance: ${currentIbcModuleBalance_2.toString()} acudos`);
    logGeneral(`Current network 1 IBC denom balance: ${currentTotalIbcDenomBalance_1.toString()} ${ibcDenom_1.toString()}`);
    logGeneral('--------------------------------------------------------------------');

    let error = false;

    if(!currentIbcModuleBalance_1.eq(currentTotalIbcDenomBalance_2)){
        logError(`ERROR: IBC module balance on chain 1 does not match  the IBC denom amount minted on chain 2: module has ${currentIbcModuleBalance_1} and chain 1 has ${currentTotalIbcDenomBalance_2}`)
        error = true;
    } 
    
    if(!currentIbcModuleBalance_2.eq(currentTotalIbcDenomBalance_1)){
        logError(`ERROR: module balance on chain 2 does not match  the IBC denom amount minted on chain 1: module has ${currentIbcModuleBalance_2} and chain 1 has ${currentTotalIbcDenomBalance_1}`)
        error = true;
    }

    if(!error){
        logSuccess("Ibc balances match so far");
    }
}
