import hre from "hardhat";

async function main() {
    const { viem } = await hre.network.connect();
    const [walletClient] = await viem.getWalletClients();
    const account = walletClient.account;

    console.log("Deploying StrategyNFT from:", account.address);

    const nft = await viem.deployContract(
        "StrategyNFT",
        [],
        { client: { wallet: walletClient } }
    );

    console.log("StrategyNFT deployed at:", nft.address);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
