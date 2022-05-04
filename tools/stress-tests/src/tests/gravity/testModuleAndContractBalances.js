import { sendToEthTx } from '../../cudos/txs';
import sendToCudos from '../../ethereum/sendToCudos.js';
import { getCudosAddressBalance, getSigner } from '../../cudos/cudosUtils.js';
import ethers from 'ethers';
import ERC20Abi from '../../../abi/TestERC20A.sol/TestERC20A.json';
import BigNumber from 'bignum';
import wait from '../../utils/wait.js';
import {logError, logGeneral, logSuccess} from '../../utils/logger.js';

export default async function runTest(baseConfig, gravityConfig) {
    // setup
    const N_OF_ADDRESSES = gravityConfig.TEST.NUMBER_OF_ADDRESSES;
    const N_OF_TESTS = gravityConfig.TEST.NUMBER_OF_TESTS;
    const MAX_ACUDOS_PER_ADDRESS = gravityConfig.MAX_ACUDOS_PER_ADDRESS;

    const BATCH_CREATION_WAIT = gravityConfig.CUDOS_NETWORK.BATCH_CREATION_BLOCKS * baseConfig.blockTime;

    const ethFaucetPrivKey = gravityConfig.ETHEREUM.ETH_PRIV_KEY.replaceAll("\"", '');
    const ethProvider = new ethers.providers.JsonRpcProvider(gravityConfig.ETHEREUM.ETH_NODE_URL);
    const ethFaucet = new ethers.Wallet(ethFaucetPrivKey, ethProvider);
    const erc20Cudos = ethers.ContractFactory.getContract(gravityConfig.ETHEREUM.ERC20_CONTRACT_ADDRESS, ERC20Abi.abi, ethFaucet);

    const cudosFaucetAddress = baseConfig.provider.getAddress(baseConfig.faucetMnemonic);

    const cudosFeePerMsg = (new BigNumber(gravityConfig.CUDOS_NETWORK.GAS_PER_MSG)).mul(gravityConfig.CUDOS_NETWORK.GAS_PRICE);
    const cudosBalancePerAddressNeeded = (new BigNumber(gravityConfig.CUDOS_NETWORK.BRIDGE_FEE)).add(cudosFeePerMsg).add(MAX_ACUDOS_PER_ADDRESS);

    // checks for enough faucet balances
    const ethFaucetInitialEthBalance = await ethFaucet.getBalance();
    if (ethFaucetInitialEthBalance.lt(ethers.utils.parseEther('1'))){
        logError(`Not enough ETH balance in faucet - needed 1ETH, got ${ethFaucetInitialEthBalance.toString()}ETH`);
        return;
    }

    const ethFaucetAcudosBalance = new BigNumber(await erc20Cudos.balanceOf(ethFaucet.address));
    const neededBalance = MAX_ACUDOS_PER_ADDRESS.mul(N_OF_ADDRESSES*N_OF_TESTS);
    if (ethFaucetAcudosBalance.lt(neededBalance)) {
        logError(`Not enough acudos balance in faucet - needed ${neededBalance.toString()}acudos, got ${ethFaucetAcudosBalance.toString()}acudos`);
        return;
    }

    const cudosFaucetBalance = await getCudosAddressBalance(cudosFaucetAddress);
    const cudosFaucetBalanceNeeded = cudosBalancePerAddressNeeded.add(cudosFeePerMsg).mul(N_OF_ADDRESSES*N_OF_TESTS);
    if (cudosFaucetBalance.lt(cudosFaucetBalanceNeeded)) {
        logError(`Not enough acudos balance in CUDOS faucet - needed ${cudosFaucetBalanceNeeded.toString()}acudos, got ${cudosFaucetBalance.toString()}acudos`);
        return;
    }

    const fundedEthWallets = [];

    const cudosWallets = [];
    for (let i = 0; i < N_OF_ADDRESSES; i++) {
        const mnemonic = cudosProvider.getRandomMnemonic();
        const address = cudosProvider.getAddress(mnemonic);
        cudosWallets.push({
            mnemonic,
            address
        }
        )
        const wallet = ethers.Wallet.createRandom();
        fundedEthWallets.push(wallet);
    }

    const initGravityModuleBalance = await getCudosAddressBalance(gravityConfig.CUDOS_NETWORK.GRAVITY_MODULE_ADDRESS);
    const initGravityContractBalance = await erc20Cudos.balanceOf(gravityConfig.ETHEREUM.BRIDGE_CONTRACT_ADDRESS);

    logGeneral(`Innitial Gravity module balance: ${initGravityModuleBalance.toString()}acudos`);
    logGeneral(`Innitial Gravity contract balance: ${initGravityContractBalance.toString()}acudos`);

    for(let i = 0; i < N_OF_TESTS; i++){

        logGeneral("Creating Gravity send txs");

        try {
            logGeneral("Sending to cudos...");
            await sendToCudos(ethFaucetPrivKey, cudosWallets.map(w => w.address), MAX_ACUDOS_PER_ADDRESS);
        } catch (e) {
            logError(e);
        }

        try {
            logGeneral("Sending to ETH...");
            const signer = await getSigner(cudosProvider, baseConfig.faucetMnemonic)
            await sendToEthTx(cudosProvider, signer, fundedEthWallets.map(w => w.address), MAX_ACUDOS_PER_ADDRESS);
        } catch (e) {
            logError(e);
        }

        await wait(BATCH_CREATION_WAIT, `to be sure the batch was created...`);

        const currentGravityModuleBalance = await getCudosAddressBalance(gravityConfig.CUDOS_NETWORK.GRAVITY_MODULE_ADDRESS);
        const currentGravityContractBalance = await erc20Cudos.balanceOf(gravityConfig.ETHEREUM.BRIDGE_CONTRACT_ADDRESS);
    
        checkBalances(initGravityModuleBalance, currentGravityModuleBalance, initGravityContractBalance, currentGravityContractBalance);
    }

    await wait(BATCH_CREATION_WAIT, `to be sure the txs pass...`);

    const finalGravityModuleBalance = await getCudosAddressBalance(gravityConfig.CUDOS_NETWORK.GRAVITY_MODULE_ADDRESS);
    const finalGravityContractBalance = await erc20Cudos.balanceOf(gravityConfig.ETHEREUM.BRIDGE_CONTRACT_ADDRESS);

    logGeneral(`Final Gravity module balance: ${finalGravityModuleBalance.toString()}acudos`);
    logGeneral(`Final Gravity contract balance: ${finalGravityContractBalance.toString()}acudos`);

    checkBalances(initGravityModuleBalance, finalGravityModuleBalance, initGravityContractBalance, finalGravityContractBalance);
};

function checkBalances(initModule, currentModule, initContract, currentContract){

    const initBalance = (new BigNumber(initModule.toString())).add(initContract.toString());
    const currentBalance = (new BigNumber(currentModule.toString())).add(currentContract.toString());

    if(!initBalance.eq(currentBalance)){
        logError(`Gravity balance does not match the initial balance - innitial is ${initBalance.toString()}acudos, current is ${currentBalance.toString()}acudos`)
    } else {
        logSuccess("Gravity cotnract balances match");
    }
}