"use client";

import { createPublicClient, createWalletClient, custom, http } from "viem";
import { sepolia } from "viem/chains";

/**
 * Public client
 * - Used for READ operations (ownerOf, balanceOf, etc.)
 * - Safe on server + client
 */
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

/**
 * Wallet client
 * - Used for WRITE operations (mint, transfer)
 * - Only initialized in browser
 * - Safe for Vercel / SSR
 */
export const walletClient =
  typeof window !== "undefined" && (window as any).ethereum
    ? createWalletClient({
      chain: sepolia,
      transport: custom((window as any).ethereum),
    })
    : null;
