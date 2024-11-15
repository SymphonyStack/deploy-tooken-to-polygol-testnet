require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const privateKey = process.argv.includes("--private-key") ?
    process.argv[process.argv.indexOf("--private-key") + 1] :
    process.env.PRIVATE_KEY;

if (!privateKey) {
    throw new Error("Private key not provided. Use --private-key argument or set PRIVATE_KEY in .env file.");
}

module.exports = {
    solidity: "0.8.0",
    networks: {
        mumbai: {
            url: 'https://rpc-amoy.polygon.technology/',
            accounts: [`0x${privateKey}`]
        }
    }
};