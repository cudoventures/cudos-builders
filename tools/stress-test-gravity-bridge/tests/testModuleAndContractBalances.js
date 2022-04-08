import sendToEth from '../cudos-to-eth/sendToEth.js';
import config from '../config/config.js';
import sendToCudos from '../eth-to-cudos/sendToCudos.js';
import { getCudosAddressBalance, sendAcudos } from '../cudos-to-eth/utils.js';
import ethers from 'ethers';
import { Cosmos } from "@cosmostation/cosmosjs";
import ERC20Abi from '../eth-to-cudos/abi/TestERC20A.sol/TestERC20A.json';
import BigNumber from 'bignum';

const numberOfAddresses = config.TEST.NUMBER_OF_ADDRESSES;
const numberOfTests = config.TEST.NUMBER_OF_TESTS;
const maxAcudosPerAddress = new BigNumber(100000);

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";

async function runTest() {
    // setup
    const ethFaucetPrivKey = config.ETHEREUM.ETH_PRIV_KEY.replaceAll("\"", '');
    const ethProvider = new ethers.providers.JsonRpcProvider(config.ETHEREUM.ETH_NODE_URL);
    const ethFaucet = new ethers.Wallet(ethFaucetPrivKey, ethProvider);
    const erc20Cudos = ethers.ContractFactory.getContract(config.ETHEREUM.ERC20_CONTRACT_ADDRESS, ERC20Abi.abi, ethFaucet);

    const cudosProvider = new Cosmos(config.CUDOS_NETWORK.REST, config.CUDOS_NETWORK.CHAIN_ID);
    cudosProvider.setPath("m/44'/118'/0'/0/0");
    cudosProvider.bech32MainPrefix = 'cudos'
    const faucetMnemonic = config.CUDOS_NETWORK.MNEMONIC.replaceAll("\"", '');
    const cudosFaucetAddress = cudosProvider.getAddress(faucetMnemonic);

    const cudosFeePerMsg = (new BigNumber(config.CUDOS_NETWORK.GAS_PER_MSG)).mul(config.CUDOS_NETWORK.GAS_PRICE);
    const cudosBalancePerAddressNeeded = (new BigNumber(config.CUDOS_NETWORK.BRIDGE_FEE)).add(cudosFeePerMsg).add(maxAcudosPerAddress);

    // checks for enough faucet balances
    const ethFaucetInitialEthBalance = await ethFaucet.getBalance();
    if (ethFaucetInitialEthBalance.lt(ethers.utils.parseEther('1'))){
        console.log(RED, `Not enough ETH balance in faucet - needed 1ETH, got ${ethFaucetInitialEthBalance.toString()}ETH`);
        return;
    }

    const ethFaucetAcudosBalance = new BigNumber(await erc20Cudos.balanceOf(ethFaucet.address));
    const neededBalance = maxAcudosPerAddress.mul(numberOfAddresses*numberOfTests);
    if (ethFaucetAcudosBalance.lt(neededBalance)) {
        console.log(RED, `Not enough acudos balance in faucet - needed ${neededBalance.toString()}acudos, got ${ethFaucetAcudosBalance.toString()}acudos`);
        return;
    }

    const cudosFaucetBalance = await getCudosAddressBalance(cudosFaucetAddress);
    const cudosFaucetBalanceNeeded = cudosBalancePerAddressNeeded.add(cudosFeePerMsg).mul(numberOfAddresses*numberOfTests);
    if (cudosFaucetBalance.lt(cudosFaucetBalanceNeeded)) {
        console.log(RED, `Not enough acudos balance in CUDOS faucet - needed ${cudosFaucetBalanceNeeded.toString()}acudos, got ${cudosFaucetBalance.toString()}acudos`);
        return;
    }

    // console.log(GREEN, "Funding addresses...");
    //fund ETH wallets with ethers and acudos
    const fundedEthWallets = [];
    for (let i = 0; i < numberOfAddresses; i++) {
        // create wallet
        const wallet = ethers.Wallet.createRandom();
        fundedEthWallets.push(wallet);

        // // fund with eth for gas
        // let tx = {
        //     to: wallet.address,
        //     value: ethers.utils.parseEther(ethFundAmount)
        // };
        
        // await ethFaucet.sendTransaction(tx).then((tx) => {
        //     console.log(GREEN, `Address ${wallet.address} funded with ${ethFundAmount} ethers`)
        // }).catch((e) => {
        //         console.log(RED, 'ERROR:'+ e)
        //         return;
        // });
        
        // // fund with acudos
        // await erc20Cudos.transfer(wallet.address, maxAcudosPerAddress.toString()).then((tx) => {
        //     console.log(GREEN, `Address ${wallet.address} funded with ${maxAcudosPerAddress.toString()} acudos`)
        // }).catch((e) => {
        //         console.log(RED, 'ERROR:'+ e)
        //         return;
        // });
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

    // try {
    //     const res = await sendAcudos(cudosProvider, faucetMnemonic, fundedCudosAddresses, cudosBalancePerAddressNeeded);
    //     for(let address of fundedCudosAddresses){
    //         console.log(GREEN, `Address ${address} funded with ${cudosBalancePerAddressNeeded.toString()} acudos`);
    //     }
    // } catch (e) {
    //     console.log(RED, e);
    //     return;
    // }

    // await new Promise((resolve) => {
    //     console.log(GREEN, "Waiting 15 seconds to be sure the txs pass...");
    //     setTimeout(resolve, 15000);
    //   });

    const initGravityModuleBalance = await getCudosAddressBalance(config.CUDOS_NETWORK.GRAVITY_MODULE_ADDRESS);
    const initGravityContractBalance = await erc20Cudos.balanceOf(config.ETHEREUM.BRIDGE_CONTRACT_ADDRESS);

    console.log(GREEN, `Innitial Gravity module balance: ${initGravityModuleBalance.toString()}acudos`);
    console.log(GREEN, `Innitial Gravity contract balance: ${initGravityContractBalance.toString()}acudos`);

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