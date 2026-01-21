"use client";

import { useState } from "react";
import { walletClient } from "./config/viem";
import {
  getStrategyOwner,
  mintStrategyNFT,
} from "./lib/strategyNFT";

export default function Home() {
  const [wallet, setWallet] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  async function connectWallet() {
    if (!walletClient) {
      alert("MetaMask not found");
      return;
    }

    const [address] = await walletClient.requestAddresses();
    setWallet(address);
  }

  async function mintNFT() {
    try {
      setStatus("Minting Strategy NFT...");
      await mintStrategyNFT(1); // strategyId = 1
      setStatus("Strategy NFT minted (tokenId = 0)");
    } catch (err) {
      console.error(err);
      setStatus("Mint failed");
    }
  }

  async function fetchOwner() {
    try {
      const ownerAddress = await getStrategyOwner(0); // tokenId = 0
      setOwner(ownerAddress);
    } catch (err) {
      console.error(err);
      setOwner("Token not minted yet");
    }
  }

  return (
    <main className="min-h-screen p-10 space-y-6 bg-black text-white">
      <h1 className="text-4xl font-bold">StratX</h1>

      <p className="text-gray-400">
        On-chain ownership of trading strategies
      </p>

      {/* Wallet */}
      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-white text-black rounded"
      >
        Connect Wallet
      </button>

      {wallet && (
        <p className="text-green-400">
          Connected: {wallet}
        </p>
      )}

      {/* Mint */}
      <button
        onClick={mintNFT}
        className="px-4 py-2 bg-green-600 rounded"
      >
        Mint Strategy NFT
      </button>

      {/* Fetch Owner */}
      <button
        onClick={fetchOwner}
        className="px-4 py-2 bg-blue-600 rounded"
      >
        Get Strategy #0 Owner
      </button>

      {/* Output */}
      {owner && (
        <p className="text-yellow-400">
          Strategy Owner: {owner}
        </p>
      )}

      {status && (
        <p className="text-gray-400">
          {status}
        </p>
      )}
    </main>
  );
}
