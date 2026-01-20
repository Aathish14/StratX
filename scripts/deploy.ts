import hre from "hardhat";

async function main() {
  // Get Viem wallet client (this gives us the deployer)
  const [walletClient] = await hre.viem.getWalletClients();
  const account = walletClient.account;

  console.log("Deploying from:", account.address);

  // Deploy StrategyRegistry
  const registry = await viem.deployContract(
    "StrategyRegistry",
    [],
    { client: { wallet: walletClient } }
  );

  // Deploy StrategyPool
  const pool = await viem.deployContract(
    "StrategyPool",
    ["StratX Pool", "SXP"],
    { client: { wallet: walletClient } }
  );

  // Deploy PnLSettlement
  const settlement = await viem.deployContract(
    "PnLSettlement",
    [account.address],
    { client: { wallet: walletClient } }
  );

  console.log("StrategyRegistry:", registry.address);
  console.log("StrategyPool:", pool.address);
  console.log("PnLSettlement:", settlement.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
