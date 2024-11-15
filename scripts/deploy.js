async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log('2')
    const args = process.argv.slice(2);
    const name = args[4];
    const symbol = args[5];
    const initialSupply = args[6];
    console.log('2')
    console.log(name)
    console.log(symbol)
    console.log(initialSupply)

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