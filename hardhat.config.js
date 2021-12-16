require('dotenv').config()
require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.4',
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: +process.env.HARDHAT_CHAIN_ID || 1337,
    },
    ropsten: {
      url: process.env.ROPSTEN_URL,
      accounts: [`0x${process.env.ROPSTEN_PRIVATE_KEY}`],
    },
  },
}
