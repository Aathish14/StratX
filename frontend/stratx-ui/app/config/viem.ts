import { createWalletClient, createPublicClient, custom, http } from "viem";
import { sepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http("https://eth-sepolia.g.alchemy.com/v2/btMuWZ4bPG07p5SXav2et"),
});

export const walletClient =
  typeof window !== "undefined" && window.ethereum
    ? createWalletClient({
      chain: sepolia,
      transport: custom(window.ethereum),
    })
    : null;
