async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const args = process.argv.slice(2);
    const name = args[0];
    const symbol = args[1];
    const initialSupply = args[2];

    if (!name || !symbol || !initialSupply) {
        throw new Error("Please provide the name, symbol, and initial supply as arguments");
    }

    const Token = await ethers.getContractFactory("MyToken");
    const token = await Token.deploy(name, symbol, initialSupply);

    console.log("Token deployed to:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });