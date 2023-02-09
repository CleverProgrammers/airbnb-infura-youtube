const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  networks: {
    inf_AirBnb_goerli: {
      network_id: 5,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('/Users/kevin/github/key.env', 'utf-8'), "https://goerli.infura.io/v3/aa50c029bd504c168a56d8c97f73500f")
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.8.16"
    }
  }
};
