import { publicClient, walletClient } from "../config/viem";
import StrategyNFT from "../../src/abi/StrategyNFT.json";

// 🔗 Deployed StrategyNFT address (Sepolia)
export const STRATEGY_NFT_ADDRESS =
  "0x748348d1b5f88277f5ede9ee2f63e953469d7751";

/**
 * 🔍 Safely read owner of a Strategy NFT
 * Returns a friendly message if token is not minted
 */
export async function getStrategyOwner(tokenId: number) {
  try {
    const owner = await publicClient.readContract({
      address: STRATEGY_NFT_ADDRESS as `0x${string}`,
      abi: StrategyNFT.abi,
      functionName: "ownerOf",
      args: [BigInt(tokenId)],
    });

    return owner as string;
  } catch (err) {
    return "Token not minted yet";
  }
}

/**
 * 🪙 Mint a new Strategy NFT
 * Forces Sepolia network before minting
 */
export async function mintStrategyNFT(strategyId: number) {
  if (!window.ethereum) {
    throw new Error("MetaMask not found");
  }

  // 🔁 Force switch to Sepolia
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0xaa36a7" }], // 11155111 (Sepolia)
  });

  const [account] = await walletClient.requestAddresses();

  const txHash = await walletClient.writeContract({
    address: STRATEGY_NFT_ADDRESS as `0x${string}`,
    abi: StrategyNFT.abi,
    functionName: "mintStrategy",
    args: [account, BigInt(strategyId)],
    account,
  });

  return txHash;
}
