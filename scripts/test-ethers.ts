import hre from "hardhat";

async function main() {
    console.log("HRE Ethers is available:", !!hre.ethers);
    if (hre.ethers) {
        const signers = await hre.ethers.getSigners();
        console.log("Signers found:", signers.length);
    }
}

main().catch(console.error);
