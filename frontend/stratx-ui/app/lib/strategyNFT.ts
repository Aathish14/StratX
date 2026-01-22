"use client";

import { publicClient, getWalletClient } from "../config/viem";
import StrategyNFT from "../../src/abi/StrategyNFT.json";

const STRATEGY_NFT_ADDRESS =
  process.env.NEXT_PUBLIC_STRATEGY_NFT_ADDRESS as `0x${string}`;

/**
 * Read-only: get owner of a strategy NFT
 */
export async function getStrategyOwner(tokenId: number) {
  const owner = await publicClient.readContract({
    address: STRATEGY_NFT_ADDRESS,
    abi: StrategyNFT.abi,
    functionName: "ownerOf",
    args: [BigInt(tokenId)],
  });

  return owner as string;
}

/**
 * Write: mint a new Strategy NFT
 */
export async function mintStrategyNFT(strategyId: number) {
  if (typeof window === "undefined") {
    throw new Error("Window not found");
  }
  const ethereum = (window as any).ethereum;
  if (!ethereum) {
    throw new Error("MetaMask not found");
  }

  // Force Sepolia
  await ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: "0xaa36a7" }], // 11155111
  });

  const walletClient = getWalletClient();
  if (!walletClient) {
    throw new Error("Wallet client unavailable");
  }

  const [account] = await walletClient.requestAddresses();

  const txHash = await walletClient.writeContract({
    address: STRATEGY_NFT_ADDRESS,
    abi: StrategyNFT.abi,
    functionName: "mintStrategy",
    args: [account, BigInt(strategyId)],
    account,
  });

  return txHash;
}
