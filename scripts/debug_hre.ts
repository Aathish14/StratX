import hre from "hardhat";

async function main() {
    console.log("HRE keys:", Object.keys(hre));

    try {
        if (hre.viem) {
            console.log("hre.viem exists!");
        } else {
            console.log("hre.viem is undefined");
        }

        // Check if it's on the network object
        console.log("hre.network keys:", Object.keys(hre.network));

        // Try the V3 style connect
        console.log("Attempting hre.network.connect()...");
        const connection = await hre.network.connect();
        console.log("Connection result keys:", Object.keys(connection));

        if (connection.viem) {
            console.log("connection.viem exists!");
        }

    } catch (error) {
        console.error("Error during debug:", error);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
