import ethers from "ethers";
import ERC20Abi from '../../abi/TestERC20A.sol/TestERC20A.json';
import { logError, logGeneral } from "../utils/logger";

export async function sendAcudos(config, amount) {
    const provider = new ethers.providers.JsonRpcProvider(config.ETHEREUM.ETH_NODE_URL);
    const wallet = new ethers.Wallet(config.ETHEREUM.ETH_PRIV_KEY, provider);

    const erc20Cudos = ethers.ContractFactory.getContract(config.ETHEREUM.ERC20_CONTRACT_ADDRESS, ERC20Abi.abi, wallet);

    try {
        return await erc20Cudos.transfer(config.ETHEREUM.BRIDGE_CONTRACT_ADDRESS, amount);
    } catch(e) {
        logError(e);
    }
}
