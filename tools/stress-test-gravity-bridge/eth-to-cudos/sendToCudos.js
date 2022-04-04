import ethers from "ethers";
import GravityAbi from './abi/Gravity.sol/Gravity.json';
import ERC20Abi from './abi/TestERC20A.sol/TestERC20A.json';
import config from "../config/config.js";
import { fromBech32, toBase64, toHex } from '@cosmjs/encoding';

export default async function sendToCudos(ethPrivKey, cudosAddresses, amount) {
    const provider = new ethers.providers.JsonRpcProvider(config.ETHEREUM.ETH_NODE_URL);
    const wallet = new ethers.Wallet(ethPrivKey, provider);

    const erc20Cudos = ethers.ContractFactory.getContract(config.ETHEREUM.ERC20_CONTRACT_ADDRESS, ERC20Abi.abi, wallet);
    const gravity = ethers.ContractFactory.getContract(config.ETHEREUM.BRIDGE_CONTRACT_ADDRESS, GravityAbi.abi, wallet);

    const sendCount = cudosAddresses.length;
    erc20Cudos.approve(gravity.address, amount*sendCount)
    .then((res) => {
        for (let cudosAddress of cudosAddresses) {
            const addressByteArray = fromBech32(cudosAddress).data;
            const addressBytes32Array = new Uint8Array(32);
            addressByteArray.forEach((byte, i) => { addressBytes32Array[32 - addressByteArray.length + i] = byte });

            gravity.sendToCosmos(
                erc20Cudos.address,
                `0x${toHex(addressBytes32Array)}`,
                amount
            ).then((res) => console.log(res));
        }
    });
}
