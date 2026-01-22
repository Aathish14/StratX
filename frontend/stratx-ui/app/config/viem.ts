"use client";

import { createPublicClient, createWalletClient, custom, http } from "viem";
import { sepolia } from "viem/chains";

/**
 * Read-only client (safe everywhere)
 */
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

/**
 * Wallet client (browser only)
 */
export const walletClient =
  typeof window !== "undefined" && window.ethereum
    ? createWalletClient({
      chain: sepolia,
      transport: custom(window.ethereum),
    })
    : null;
