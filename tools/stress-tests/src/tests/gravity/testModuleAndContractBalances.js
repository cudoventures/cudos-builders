import sendTx from '../../cudos/txs';
import sendToCudos from '../../ethereum/sendToCudos.js';
import { constants, getAddressBalance, getRandomWallets, getSigner } from '../../cudos/cudosUtils.js';
import ethers from 'ethers';
import ERC20Abi from '../../../abi/TestERC20A.sol/TestERC20A.json';
import BigNumber from 'bignum';
import wait from '../../utils/wait.js';
import {logError, logGeneral, logSuccess} from '../../utils/logger.js';
import { sendToEthMsg } from '../../cudos/msgs';
import { sendAcudos } from '../../ethereum/ethereumUtils';

const testName = 'GRAVITY: ';
export default async function runTest(baseConfig, gravityConfig) {
    // setup
    const N_OF_ADDRESSES = gravityConfig.TEST.NUMBER_OF_ADDRESSES;
    const N_OF_TESTS = gravityConfig.TEST.NUMBER_OF_TESTS;
    const MAX_ACUDOS_PER_ADDRESS = gravityConfig.TEST.MAX_ACUDOS_PER_ADDRESS;

    const BATCH_CREATION_WAIT = gravityConfig.CUDOS_NETWORK.BATCH_CREATION_BLOCKS * baseConfig.blockTime;

    const ethFaucetPrivKey = gravityConfig.ETHEREUM.ETH_PRIV_KEY.replaceAll("\"", '');
    const ethProvider = new ethers.providers.JsonRpcProvider(gravityConfig.ETHEREUM.ETH_NODE_URL);
    const ethFaucet = new ethers.Wallet(ethFaucetPrivKey, ethProvider);
    const erc20Cudos = ethers.ContractFactory.getContract(gravityConfig.ETHEREUM.ERC20_CONTRACT_ADDRESS, ERC20Abi.abi, ethFaucet);

    const cudosFaucetAddress = baseConfig.provider.getAddress(baseConfig.faucetMnemonic);

    const cudosFeePerMsg = constants.GAS_LIMITS.GRAVITY_SEND_TO_ETH.mul(baseConfig.gasPrice);
    const cudosBalancePerAddressNeeded = gravityConfig.CUDOS_NETWORK.BRIDGE_FEE.add(cudosFeePerMsg).add(MAX_ACUDOS_PER_ADDRESS);

    // checks for enough faucet balances
    const ethFaucetInitialEthBalance = await ethFaucet.getBalance();
    if (ethFaucetInitialEthBalance.lt(ethers.utils.parseEther('1'))){
        logError(testName + `Not enough ETH balance in faucet - needed 1ETH, got ${ethFaucetInitialEthBalance.toString()}ETH`);
        return;
    }

    const ethFaucetAcudosBalance = new BigNumber(await erc20Cudos.balanceOf(ethFaucet.address));
    const neededBalance = MAX_ACUDOS_PER_ADDRESS.mul(N_OF_ADDRESSES*N_OF_TESTS);
    if (ethFaucetAcudosBalance.lt(neededBalance.mul(2))) {
        logError(testName + `Not enough acudos balance in faucet - needed ${neededBalance.toString()}acudos, got ${ethFaucetAcudosBalance.toString()}acudos`);
        return;
    }

    const cudosFaucetBalance = await getAddressBalance(cudosFaucetAddress, 'acudos', baseConfig.rest);
    const cudosFaucetBalanceNeeded = cudosBalancePerAddressNeeded.add(cudosFeePerMsg).mul(N_OF_ADDRESSES*N_OF_TESTS);
    if (cudosFaucetBalance.lt(cudosFaucetBalanceNeeded)) {
        logError(testName + `Not enough acudos balance in CUDOS faucet - needed ${cudosFaucetBalanceNeeded.toString()}acudos, got ${cudosFaucetBalance.toString()}acudos`);
        return;
    }

    // fund the contract
    const gravityContractAcudosBalance = await erc20Cudos.balanceOf(gravityConfig.ETHEREUM.BRIDGE_CONTRACT_ADDRESS);
    if (gravityContractAcudosBalance.lt(neededBalance.toString())){
        logGeneral(testName + "The gravity contract is missing some acudos, funding it...");
        await sendAcudos(gravityConfig, neededBalance.toString());
        await wait(120, "to be sure the batch is transported");
    }

    const cudosWallets = await getRandomWallets(baseConfig.provider, N_OF_ADDRESSES);
    
    const fundedEthWallets = [];
    for (let i = 0; i < N_OF_ADDRESSES; i++) {
        const wallet = ethers.Wallet.createRandom();
        fundedEthWallets.push(wallet);
    }

    const initGravityModuleBalance = await getAddressBalance(gravityConfig.CUDOS_NETWORK.GRAVITY_MODULE_ADDRESS, 'acudos', baseConfig.rest);
    const initGravityContractBalance = await erc20Cudos.balanceOf(gravityConfig.ETHEREUM.BRIDGE_CONTRACT_ADDRESS);

    logGeneral(testName + `Innitial Gravity module balance: ${initGravityModuleBalance.toString()}acudos`);
    logGeneral(testName + `Innitial Gravity contract balance: ${initGravityContractBalance.toString()}acudos`);

    for(let i = 0; i < N_OF_TESTS; i++){

        logGeneral(testName + "Creating Gravity send txs");

        try {
            logGeneral(testName + "Sending to cudos...");
            await sendToCudos(gravityConfig, ethFaucetPrivKey, cudosWallets.map(w => w.address), MAX_ACUDOS_PER_ADDRESS);
        } catch (e) {
            logError(testName + e);
        }

        try {
            logGeneral(testName + "Sending to ETH...");
            const signer = await getSigner(baseConfig.provider, baseConfig.faucetMnemonic)
            await sendTx(
                signer, 
                sendToEthMsg,
                {
                    destinationAddresses: fundedEthWallets.map(w => w.address),
                    amount: MAX_ACUDOS_PER_ADDRESS,
                    bridgeFee: gravityConfig.CUDOS_NETWORK.BRIDGE_FEE,
                },
                constants.GAS_LIMITS.IBC_TRANSFER
            );
        } catch (e) {
            logError(testName + e);
        }

        await wait(BATCH_CREATION_WAIT, `to be sure the batch was created...`);
        await wait(60, "to be sure the batch is transported");
        const currentGravityModuleBalance = await getAddressBalance(gravityConfig.CUDOS_NETWORK.GRAVITY_MODULE_ADDRESS, 'acudos', baseConfig.rest);
        const currentGravityContractBalance = await erc20Cudos.balanceOf(gravityConfig.ETHEREUM.BRIDGE_CONTRACT_ADDRESS);
    
        checkBalances(initGravityModuleBalance, currentGravityModuleBalance, initGravityContractBalance, currentGravityContractBalance);
    }

    await wait(BATCH_CREATION_WAIT, `to be sure the txs pass...`);

    const finalGravityModuleBalance = await getAddressBalance(gravityConfig.CUDOS_NETWORK.GRAVITY_MODULE_ADDRESS, 'acudos', baseConfig.rest);
    const finalGravityContractBalance = await erc20Cudos.balanceOf(gravityConfig.ETHEREUM.BRIDGE_CONTRACT_ADDRESS);

    logGeneral(testName + `Final Gravity module balance: ${finalGravityModuleBalance.toString()}acudos`);
    logGeneral(testName + `Final Gravity contract balance: ${finalGravityContractBalance.toString()}acudos`);

    checkBalances(initGravityModuleBalance, finalGravityModuleBalance, initGravityContractBalance, finalGravityContractBalance);
};

function checkBalances(initModule, currentModule, initContract, currentContract){

    const initBalance = (new BigNumber(initModule.toString())).add(initContract.toString());
    const currentBalance = (new BigNumber(currentModule.toString())).add(currentContract.toString());

    if(!initBalance.eq(currentBalance)){
        logError(testName + `Gravity balance does not match the initial balance - innitial is ${initBalance.toString()}acudos, current is ${currentBalance.toString()}acudos`)
    } else {
        logSuccess(testName + "Gravity cotnract balances match");
    }
}
