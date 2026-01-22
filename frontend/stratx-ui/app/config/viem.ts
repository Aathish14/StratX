"use client";

import { createPublicClient, createWalletClient, custom, http } from "viem";
import { sepolia } from "viem/chains";

/**
 * Read-only client (safe on server + client)
 */
export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});

/**
 * Wallet client (browser only)
 * Wrapped in a function to avoid SSR issues
 */
export function getWalletClient() {
  if (typeof window === "undefined") return null;
  const ethereum = (window as any).ethereum;
  if (!ethereum) return null;

  return createWalletClient({
    chain: sepolia,
    transport: custom(ethereum),
  });
}
