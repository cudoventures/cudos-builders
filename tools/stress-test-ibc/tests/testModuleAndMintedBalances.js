import ibcTransfer from '../cudos-helpers/ibcTransfer.js';
import config from '../config/config.js';
import { getCudosAddressBalance, sendAcudos, getTotalDenomBalance } from '../cudos-to-eth/utils.js';
import { Cosmos } from "@cosmostation/cosmosjs";
import BigNumber from 'bignum';
import { getIbcDenom } from '../cudos-helpers/utils.js';

const numberOfAddresses = config.TEST.NUMBER_OF_ADDRESSES;
const numberOfTests = config.TEST.NUMBER_OF_TESTS;
const maxAcudosPerAddress = new BigNumber('10000000000000000');

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";

async function runTest() {
    // setup
    const cudosProvider_1 = new Cosmos(config.CUDOS_NETWORK_1.REST, config.CUDOS_NETWORK_1.CHAIN_ID);
    cudosProvider_1.setPath("m/44'/118'/0'/0/0");
    cudosProvider_1.bech32MainPrefix = 'cudos'
    const faucetMnemonic_1 = config.CUDOS_NETWORK_1.MNEMONIC.replaceAll("\"", '');
    const cudosFaucetAddress_1 = cudosProvider_1.getAddress(faucetMnemonic_1);

    const cudosFeePerMsg_1 = (new BigNumber(config.CUDOS_NETWORK_1.GAS_PER_MSG)).mul(config.CUDOS_NETWORK_1.GAS_PRICE);
    const cudosBalancePerAddressNeeded_1 = cudosFeePerMsg_1.add(maxAcudosPerAddress);

    const cudosProvider_2 = new Cosmos(config.CUDOS_NETWORK_2.REST, config.CUDOS_NETWORK_2.CHAIN_ID);
    cudosProvider_2.setPath("m/44'/118'/0'/0/0");
    cudosProvider_2.bech32MainPrefix = 'cudos'
    const faucetMnemonic_2 = config.CUDOS_NETWORK_2.MNEMONIC.replaceAll("\"", '');
    const cudosFaucetAddress_2 = cudosProvider_2.getAddress(faucetMnemonic_2);

    const cudosFeePerMsg_2 = (new BigNumber(config.CUDOS_NETWORK_2.GAS_PER_MSG)).mul(config.CUDOS_NETWORK_2.GAS_PRICE);
    const cudosBalancePerAddressNeeded_2 = cudosFeePerMsg_2.add(maxAcudosPerAddress);

    // checks for enough faucet balances
    const cudosFaucetBalance_1 = await getCudosAddressBalance(cudosFaucetAddress_1, config.NETWORK_1.REST);
    const cudosFaucetBalanceNeeded_1 = cudosBalancePerAddressNeeded_1.add(cudosFeePerMsg_1).mul(numberOfAddresses*numberOfTests);
    if (cudosFaucetBalance_1.lt(cudosFaucetBalanceNeeded_1)) {
        console.log(RED, `Not enough acudos balance in CUDOS faucet - needed ${cudosFaucetBalanceNeeded_1.toString()}acudos, got ${cudosFaucetBalance_1.toString()}acudos`);
        return;
    }

    const cudosFaucetBalance_2 = await getCudosAddressBalance(cudosFaucetAddress_2, config.NETWORK_2.REST);
    const cudosFaucetBalanceNeeded_2 = cudosBalancePerAddressNeeded_2.add(cudosFeePerMsg_2).mul(numberOfAddresses*numberOfTests);
    if (cudosFaucetBalance_2.lt(cudosFaucetBalanceNeeded_2)) {
        console.log(RED, `Not enough acudos balance in CUDOS faucet - needed ${cudosFaucetBalanceNeeded_2.toString()}acudos, got ${cudosFaucetBalance_2.toString()}acudos`);
        return;
    }

    // fund some cudos addresses
    const fundedCudosMnemonics = [];
    const fundedCudosAddresses = [];
    for (let i = 0; i < numberOfAddresses; i++) {
        const mnemonic = cudosProvider.getRandomMnemonic();
        const address = cudosProvider.getAddress(mnemonic);
        fundedCudosMnemonics.push(mnemonic); 
        fundedCudosAddresses.push(address);
    }

    const ibcFaucetMnemonic_1 = cudosProvider_1.getRandomMnemonic();
    const ibcFaucet_1 = cudosProvider_1.getAddress(ibcFaucetMnemonic_1);

    const ibcFaucetMnemonic_2 = cudosProvider_2.getRandomMnemonic();
    const ibcFaucet_2 = cudosProvider_2.getAddress(ibcFaucetMnemonic_2);

    //fund addressed to be used for ibc denom => acudos sends
    await ibcTransfer(faucetMnemonic_1, [ibcFaucet_2], config.NETWORK_1.PORT, config.NETWORK_1.CHANNEL, 'acudos', '1000000000000000000000');
    await ibcTransfer(faucetMnemonic_2, [ibcFaucet_1], config.NETWORK_2.PORT, config.NETWORK_2.CHANNEL, 'acudos', '1000000000000000000000');

    const initIbcModuleBalance_1 = await getCudosAddressBalance(config.CUDOS_NETWORK_1.IBC_MODULE_ADDRESS);
    const initIbcModuleBalance_2 = await getCudosAddressBalance(config.CUDOS_NETWORK_2.IBC_MODULE_ADDRESS);

    const ibcDenom_1 = await getIbcDenom(ibcFaucet_1, config.NETWORK_1.REST);
    const ibcDenom_2 = await getIbcDenom(ibcFaucet_2, config.NETWORK_2.REST);

    const initTotalIbcDenomBalance_1 = await getTotalDenomBalance(ibcDenom_1, config.NETWORK_1.REST);
    const initTotalIbcDenomBalance_2 = await getTotalDenomBalance(ibcDenom_2, config.NETWORK_2.REST);

    console.log(GREEN, `Innitial network 1 IBC module balance: ${initIbcModuleBalance_1.toString()}acudos`);
    console.log(GREEN, `Innitial network 2 IBC denom balance: ${initTotalIbcDenomBalance_2.toString()}${ibcDenom_2.toString()}`);

    console.log(GREEN, `Innitial network 2 IBC module balance: ${initIbcModuleBalance_2.toString()}acudos`);
    console.log(GREEN, `Innitial network 1 IBC denom balance: ${initTotalIbcDenomBalance_1.toString()}${ibcDenom_1.toString()}`);




    for(let i = 0; i < numberOfTests; i++){

        console.log(GREEN, "Creating Gravity send txs");

        try {
            console.log(GREEN, "Sending to cudos...");
            await sendToCudos(ethFaucetPrivKey, fundedCudosAddresses, maxAcudosPerAddress);
        } catch (e) {
            console.log(RED, e);
        }

        try {
            console.log(GREEN, "Sending to ETH...");
            await sendToEth(faucetMnemonic, fundedEthWallets.map(w => w.address), maxAcudosPerAddress);
        } catch (e) {
            console.log(RED, e);
        }
        await new Promise((resolve) => {
            const waitTime = config.CUDOS_NETWORK.BATCH_CREATION_BLOCKS * 7000;
            console.log(GREEN, `Waiting ${waitTime / 1000} seconds to be sure the batch was created...`);
            setTimeout(resolve, waitTime);
        });
        const currentGravityModuleBalance = await getCudosAddressBalance(config.CUDOS_NETWORK.GRAVITY_MODULE_ADDRESS);
        const currentGravityContractBalance = await erc20Cudos.balanceOf(config.ETHEREUM.BRIDGE_CONTRACT_ADDRESS);
    
        checkBalances(initGravityModuleBalance, currentGravityModuleBalance, initGravityContractBalance, currentGravityContractBalance);
    }

    await new Promise((resolve) => {
        const waitTime = config.CUDOS_NETWORK.BATCH_CREATION_BLOCKS * 7000;
        console.log(GREEN, `Waiting ${waitTime / 1000} seconds to be sure the txs pass...`);
        setTimeout(resolve, waitTime);
    });

    const finalGravityModuleBalance = await getCudosAddressBalance(config.CUDOS_NETWORK.GRAVITY_MODULE_ADDRESS);
    const finalGravityContractBalance = await erc20Cudos.balanceOf(config.ETHEREUM.BRIDGE_CONTRACT_ADDRESS);

    console.log(GREEN, `Final Gravity module balance: ${finalGravityModuleBalance.toString()}acudos`);
    console.log(GREEN, `Final Gravity contract balance: ${finalGravityContractBalance.toString()}acudos`);

    checkBalances(initGravityModuleBalance, finalGravityModuleBalance, initGravityContractBalance, finalGravityContractBalance);
};

function checkBalances(initModule, currentModule, initContract, currentContract){

    const initBalance = (new BigNumber(initModule.toString())).add(initContract.toString());
    const currentBalance = (new BigNumber(currentModule.toString())).add(currentContract.toString());

    if(!initBalance.eq(currentBalance)){
        console.log(RED, `Gravity balance does not match the initial balance - innitial is ${initBalance.toString()}acudos, current is ${currentBalance.toString()}acudos`)
    } else {
        console.log(GREEN, "Gravity cotnract balances match");
    }
}
runTest();