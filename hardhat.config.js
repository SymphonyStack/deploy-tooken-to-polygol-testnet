require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const args = process.argv.slice(2);
console.log(args)
let privateKey = "0x0000000000000000000000000000000000000000000000000000000000000000";
if (process.argv.slice(2)[0] === 'deploy') {
    privateKey = args[6]
    console.log(privateKey)
    if (!privateKey) {
        throw new Error("Private key not provided. Use --private-key argument or set PRIVATE_KEY in .env file.");
    }
}

module.exports = {
    solidity: "0.8.20",
    networks: {
        mumbai: {
            url: 'https://rpc-amoy.polygon.technology/',
            accounts: [`${privateKey}`]
        }
    }
};

task("deploy", "Deploys the MyToken contract")
    .addPositionalParam("name", "The name of the token")
    .addPositionalParam("symbol", "The symbol of the token")
    .addPositionalParam("initialSupply", "The initial supply of the token")
    .addPositionalParam("privateKey", "The private key of the deployer")
    .setAction(async(taskArgs) => {
        console.log(taskArgs)
        const [deployer] = await ethers.getSigners();

        console.log("Deploying contracts with the account:", deployer.address);

        const Token = await ethers.getContractFactory("MyToken");
        const token = await Token.deploy(taskArgs.name, taskArgs.symbol, taskArgs.initialSupply);

        console.log("##" + JSON.stringify({ address: token.address }) + "##");
    });