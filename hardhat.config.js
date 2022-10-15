require('dotenv').config()
require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.4',
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: +process.env.NEXT_PUBLIC_HARDHAT_CHAIN_ID || 1337,
    },
    // ropsten: {
    //   url: process.env.ROPSTEN_URL,
    //   accounts: [`0x${process.env.ROPSTEN_PRIVATE_KEY}`],
    // },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
      accounts: [process.env.SEPOLIA_PRIVATE_KEY]
    },
  },
}
