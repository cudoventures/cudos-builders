import sendTx from '../../cudos/txs';
import { getAddressBalance, getTotalDenomBalance, getSigner, getRandomWallets, checkTx } from '../../cudos/cudosUtils.js';
import BigNumber from 'bignum';
import wait from '../../utils/wait.js';
import {logSuccess, logError, logGeneral} from '../../utils/logger.js';
import { Cosmos } from "@cosmostation/cosmosjs";
import { ibcTransferMsg } from '../../cudos/msgs';
import { constants } from '../../cudos/cudosUtils.js';

const testName = 'IBC: ';
const BLOCKS_TO_WAIT = 10;

export default async function runTest(baseConfig, ibcConfig) {
    // setup
    const N_ADDRESSES = ibcConfig.TEST.NUMBER_OF_ADDRESSES;
    const N_TESTS = ibcConfig.TEST.NUMBER_OF_TESTS;
    const MAX_ACUDOS_PER_ADDRESS = new BigNumber(ibcConfig.TEST.MAX_ACUDOS_PER_ADDRESS);

    const cudosProvider_1 = baseConfig.provider;
    const cudosFaucetAddress_1 = cudosProvider_1.getAddress(baseConfig.faucetMnemonic);

    const cudosFeePerMsg_1 = constants.GAS_LIMITS.IBC_TRANSFER.mul(baseConfig.gasPrice);
    const cudosBalancePerAddressNeeded_1 = cudosFeePerMsg_1.add(MAX_ACUDOS_PER_ADDRESS);
    const signer_1 = await getSigner(cudosProvider_1, baseConfig.faucetMnemonic)

    const cudosProvider_2 = new Cosmos(ibcConfig.NETWORK_2.REST, ibcConfig.NETWORK_2.CHAIN_ID);
    cudosProvider_2.setPath("m/44'/118'/0'/0/0");
    cudosProvider_2.bech32MainPrefix = 'cudos';
    cudosProvider_2.gasPrice = ibcConfig.NETWORK_2.GAS_PRICE;
    
    const faucetMnemonic_2 = ibcConfig.NETWORK_2.MNEMONIC
    const cudosFaucetAddress_2 = cudosProvider_2.getAddress(faucetMnemonic_2);

    const cudosFeePerMsg_2 = constants.GAS_LIMITS.IBC_TRANSFER.mul(ibcConfig.NETWORK_2.GAS_PRICE);
    const cudosBalancePerAddressNeeded_2 = cudosFeePerMsg_2.add(MAX_ACUDOS_PER_ADDRESS);
    const signer_2 = await getSigner(cudosProvider_2, faucetMnemonic_2)

    const ibcDenom_1 = ibcConfig.NETWORK_1.IBC_DENOM;
    const ibcDenom_2 = ibcConfig.NETWORK_2.IBC_DENOM;

    // checks for enough faucet balances
    const cudosFaucetBalance_1 = await getAddressBalance(cudosFaucetAddress_1, 'acudos', baseConfig.rest);
    const cudosFaucetBalanceNeeded_1 = cudosBalancePerAddressNeeded_1.mul(N_ADDRESSES*N_TESTS).mul(4);
    const faucetFunds_1 = cudosFaucetBalanceNeeded_1.div(4);
    if (cudosFaucetBalance_1.lt(cudosFaucetBalanceNeeded_1)) {
        logError(testName + `Not enough acudos balance in CUDOS faucet - needed ${cudosFaucetBalanceNeeded_1.toString()}acudos, got ${cudosFaucetBalance_1.toString()}acudos`);
        return;
    }

    const cudosFaucetBalance_2 = await getAddressBalance(cudosFaucetAddress_2,'acudos', ibcConfig.NETWORK_2.REST);
    const cudosFaucetBalanceNeeded_2 = cudosBalancePerAddressNeeded_2.mul(N_ADDRESSES*N_TESTS*4);
    const faucetFunds_2 = cudosFaucetBalanceNeeded_2.div(4);
    if (cudosFaucetBalance_2.lt(cudosFaucetBalanceNeeded_2)) {
        logError(testName + `Not enough acudos balance in CUDOS faucet - needed ${cudosFaucetBalanceNeeded_2.toString()}acudos, got ${cudosFaucetBalance_2.toString()}acudos`);
        return;
    }

    // create some cudos addresses
    const wallets = await getRandomWallets(cudosProvider_1, N_ADDRESSES);

    //fund addressed to be used for ibc denom => acudos sends
    logGeneral(testName + 'Funding ibcDenom faucets...')

    logGeneral(testName + "Sending acudos to denom faucet on network 1...");
    const transferConfig_2 = {
        port: ibcConfig.NETWORK_2.PORT,
        channel: ibcConfig.NETWORK_2.CHANNEL,
        gasPrice: baseConfig.gasPrice,
    }  

    // let promise = ibcTransferTx(cudosProvider_2, signer_2, transferConfig_2, [cudosFaucetAddress_1], 'acudos', faucetFunds_2);
    const promise_2 = await sendTx(
        signer_2, 
        ibcTransferMsg,
        {
            sourcePort: transferConfig_2.port,
            sourceChannel: transferConfig_2.channel,
            destinationAddresses: [cudosFaucetAddress_1],
            denom: 'acudos',
            amount: faucetFunds_2,
        },
        constants.GAS_LIMITS.IBC_TRANSFER
    )
    signer_2.account.sequence++;

    logGeneral(testName + "Sending acudos to denom faucet on network 2...");
    const transferConfig_1 = {
        port: ibcConfig.NETWORK_1.PORT,
        channel: ibcConfig.NETWORK_1.CHANNEL,
        gasPrice: baseConfig.gasPrice,
    } 
    // promise = ibcTransferTx(cudosProvider_1, signer_1, transferConfig_1, [cudosFaucetAddress_2], 'acudos', faucetFunds_1);
    const promise_1 = await sendTx(
        signer_1, 
        ibcTransferMsg,
        {
            sourcePort: transferConfig_1.port,
            sourceChannel: transferConfig_1.channel,
            destinationAddresses: [cudosFaucetAddress_2],
            denom: 'acudos',
            amount: faucetFunds_1,
        },
        constants.GAS_LIMITS.IBC_TRANSFER
    )
    signer_1.account.sequence++;

    await wait(5 * baseConfig.blockTime, "For the Tx to pass");
    await checkTx(cudosProvider_2.url, promise_2);
    await checkTx(cudosProvider_1.url, promise_1);
    logSuccess(testName + "Transactions passed!");

    await wait(BLOCKS_TO_WAIT * baseConfig.blockTime, 'Waiting ibcDenom funds to pass...');

    await checkBalances(baseConfig.rest, ibcConfig.NETWORK_2.REST, ibcConfig.NETWORK_1.IBC_MODULE_ADDRESS, ibcConfig.NETWORK_2.IBC_MODULE_ADDRESS, ibcDenom_1, ibcDenom_2);
    const txs_1 = [];
    const txs_2 = [];
    for(let i = 0; i < N_TESTS; i++){
        logGeneral(testName + `Creating IBC Transfer txs N${i}`);

        try {
            logGeneral(testName + "Sending acudos to network 1...");
            // promise = ibcTransferTx(cudosProvider_2, signer_2, transferConfig_2, wallets, 'acudos', MAX_ACUDOS_PER_ADDRESS);
            let res = await sendTx(
                signer_2, 
                ibcTransferMsg,
                {
                    sourcePort: transferConfig_2.port,
                    sourceChannel: transferConfig_2.channel,
                    destinationAddresses: wallets.map(w => w.address),
                    denom: 'acudos',
                    amount: MAX_ACUDOS_PER_ADDRESS,
                },
                constants.GAS_LIMITS.IBC_TRANSFER
            )

            signer_2.account.sequence++;
            txs_2.push(res);

            logGeneral(testName + `Sending ${ibcDenom_1} to network 1...`);
            // res = ibcTransferTx(cudosProvider_2, signer_2, transferConfig_2, wallets.map(w => w.address), ibcDenom_2, MAX_ACUDOS_PER_ADDRESS);
            res = await sendTx(
                signer_2, 
                ibcTransferMsg,
                {
                    sourcePort: transferConfig_2.port,
                    sourceChannel: transferConfig_2.channel,
                    destinationAddresses: wallets.map(w => w.address),
                    denom: ibcDenom_2,
                    amount: MAX_ACUDOS_PER_ADDRESS,
                },
                constants.GAS_LIMITS.IBC_TRANSFER
            )
            signer_2.account.sequence++;
            txs_2.push(res);

            logGeneral(testName + "Sending acudos to network 2...");
            // res = ibcTransferTx(cudosProvider_1, signer_1, transferConfig_1, wallets.map(w => w.address), 'acudos', MAX_ACUDOS_PER_ADDRESS);
            res = await sendTx(
                signer_1, 
                ibcTransferMsg,
                {
                    sourcePort: transferConfig_1.port,
                    sourceChannel: transferConfig_1.channel,
                    destinationAddresses: wallets.map(w => w.address),
                    denom: 'acudos',
                    amount: MAX_ACUDOS_PER_ADDRESS,
                },
                constants.GAS_LIMITS.IBC_TRANSFER
            )
            signer_1.account.sequence++;
            txs_1.push(res);

            logGeneral(testName + `Sending ${ibcDenom_2} to network 2...`);
            // res = ibcTransferTx(cudosProvider_1, signer_1, transferConfig_1, wallets.map(w => w.address), ibcDenom_1, MAX_ACUDOS_PER_ADDRESS);
            res = await sendTx(
                signer_1, 
                ibcTransferMsg,
                {
                    sourcePort: transferConfig_1.port,
                    sourceChannel: transferConfig_1.channel,
                    destinationAddresses: wallets.map(w => w.address),
                    denom: ibcDenom_1,
                    amount: MAX_ACUDOS_PER_ADDRESS,
                },
                constants.GAS_LIMITS.IBC_TRANSFER
            )
            signer_1.account.sequence++;
            txs_1.push(res);

            await wait(BLOCKS_TO_WAIT * baseConfig.blockTime, 'to be sure the txs pass...');

            for(let txRes of txs_1){
                await checkTx(baseConfig.rest, txRes);
            }
        
            for(let txRes of txs_2){
                await checkTx(ibcConfig.NETWORK_2.REST, txRes);
            }

            logSuccess(testName + "Transactions passed!");
        } catch (e) {
            logError(testName + e);
        }
    }

    await wait(BLOCKS_TO_WAIT * baseConfig.blockTime, 'to be sure the txs are relayed...');

    await checkBalances(baseConfig.rest, ibcConfig.NETWORK_2.REST, ibcConfig.NETWORK_1.IBC_MODULE_ADDRESS, ibcConfig.NETWORK_2.IBC_MODULE_ADDRESS, ibcDenom_1, ibcDenom_2);
};

async function checkBalances(rest_1, rest_2, ibcModuleAddress_1, ibcModuleAddress_2, ibcDenom_1, ibcDenom_2){
    const currentIbcModuleBalance_1 = await getAddressBalance(ibcModuleAddress_1, ibcDenom_1, rest_1);
    const currentIbcModuleBalance_2 = await getAddressBalance(ibcModuleAddress_2, ibcDenom_2, rest_2);

    const currentTotalIbcDenomBalance_1 = await getTotalDenomBalance(ibcDenom_1, rest_1);
    const currentTotalIbcDenomBalance_2 = await getTotalDenomBalance(ibcDenom_2, rest_2);

    logGeneral(testName + '--------------------------------------------------------------------');
    logGeneral(testName + `Current network 1 IBC module balance: ${currentIbcModuleBalance_1.toString()} acudos`);
    logGeneral(testName + `Current network 2 IBC denom balance: ${currentTotalIbcDenomBalance_2.toString()} ${ibcDenom_2.toString()}`);
    logGeneral(testName + '--------------------------------------------------------------------');
    logGeneral(testName + `Current network 2 IBC module balance: ${currentIbcModuleBalance_2.toString()} acudos`);
    logGeneral(testName + `Current network 1 IBC denom balance: ${currentTotalIbcDenomBalance_1.toString()} ${ibcDenom_1.toString()}`);
    logGeneral(testName + '--------------------------------------------------------------------');

    let error = false;

    if(!currentIbcModuleBalance_1.eq(currentTotalIbcDenomBalance_2)){
        logError(testName + `ERROR: IBC module balance on chain 1 does not match  the IBC denom amount minted on chain 2: module has ${currentIbcModuleBalance_1} and chain 1 has ${currentTotalIbcDenomBalance_2}`)
        error = true;
    } 
    
    if(!currentIbcModuleBalance_2.eq(currentTotalIbcDenomBalance_1)){
        logError(testName + `ERROR: module balance on chain 2 does not match  the IBC denom amount minted on chain 1: module has ${currentIbcModuleBalance_2} and chain 1 has ${currentTotalIbcDenomBalance_1}`)
        error = true;
    }

    if(!error){
        logSuccess(testName + "Ibc balances match so far");
    }
}
