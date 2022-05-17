import ethers from "ethers";
import GravityAbi from '../../abi/Gravity.sol/Gravity.json';
import ERC20Abi from '../../abi/TestERC20A.sol/TestERC20A.json';
import { fromBech32, toHex } from '@cosmjs/encoding';
import { logGeneral } from "../utils/logger";
import wait from "../utils/wait";

export default async function sendToCudos(config, ethPrivKey, cudosAddresses, maxAmountPerAddress) {
    const provider = new ethers.providers.JsonRpcProvider(config.ETHEREUM.ETH_NODE_URL);
    const wallet = new ethers.Wallet(ethPrivKey, provider);

    const erc20Cudos = ethers.ContractFactory.getContract(config.ETHEREUM.ERC20_CONTRACT_ADDRESS, ERC20Abi.abi, wallet);
    const gravity = ethers.ContractFactory.getContract(config.ETHEREUM.BRIDGE_CONTRACT_ADDRESS, GravityAbi.abi, wallet);

    const sendCount = cudosAddresses.length;

    const res = await erc20Cudos.approve(gravity.address, maxAmountPerAddress.mul(sendCount).toString());

    wait(15, "to be sure the allowance tx passes...");
    logGeneral("Sending \"sendToCosmos\" transactions...")
    for (let cudosAddress of cudosAddresses) {
        const addressByteArray = fromBech32(cudosAddress).data;
        const addressBytes32Array = new Uint8Array(32);
        addressByteArray.forEach((byte, i) => { addressBytes32Array[32 - addressByteArray.length + i] = byte });
        const amountToSend = maxAmountPerAddress;
        
        await gravity.sendToCosmos(
            erc20Cudos.address,
            `0x${toHex(addressBytes32Array)}`,
            amountToSend.toString()
        );
    }
}
