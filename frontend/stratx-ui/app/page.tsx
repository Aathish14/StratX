"use client";

import { useState } from "react";
import { getWalletClient } from "./config/viem";
import { getStrategyOwner, mintStrategyNFT } from "./lib/strategyNFT";

export default function Home() {
  const [wallet, setWallet] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");

  async function connectWallet() {
    const walletClient = getWalletClient();
    if (!walletClient) {
      alert("MetaMask not found");
      return;
    }

    const [address] = await walletClient.requestAddresses();
    setWallet(address);
  }

  async function fetchOwner() {
    const owner = await getStrategyOwner(1);
    setOwner(owner);
  }

  async function mintNFT() {
    const hash = await mintStrategyNFT(1);
    setTxHash(hash);
  }

  return (
    <main className="min-h-screen p-10 space-y-6 bg-black text-white">
      <h1 className="text-4xl font-bold">StratX</h1>
      <p className="text-gray-400">
        On-chain ownership of trading strategies
      </p>

      <button
        onClick={connectWallet}
        className="px-4 py-2 bg-white text-black rounded"
      >
        Connect Wallet
      </button>

      {wallet && <p>Connected: {wallet}</p>}

      <button
        onClick={fetchOwner}
        className="px-4 py-2 bg-blue-600 rounded"
      >
        Get Strategy #1 Owner
      </button>

      {owner && <p>Strategy Owner: {owner}</p>}

      <button
        onClick={mintNFT}
        className="px-4 py-2 bg-green-600 rounded"
      >
        Mint Strategy NFT
      </button>

      {txHash && (
        <p className="break-all">
          Tx Hash: {txHash}
        </p>
      )}
    </main>
  );
}
