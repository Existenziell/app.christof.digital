// https://docs.blocknative.com/onboard
// https://reactdemo.blocknative.com/
import Onboard from 'bnc-onboard'
import Web3 from 'web3'
/* eslint-disable no-unused-vars */
let web3
/* eslint-enable no-unused-vars */

const onboard = Onboard({
  dappId: process.env.NEXT_PUBLIC_ONBOARD_KEY,
  networkId: 3,
  darkMode: true,
  subscriptions: {
    wallet: wallet => {
      web3 = new Web3(wallet.provider)
    },
    // balance: balance => {
    //   web3 = new Web3(balance.provider)
    // }
  },
})

// const wallet = await onboard.walletSelect()
// console.log(wallet);
// if (wallet) {
//   // const check = await onboard.walletCheck()
//   // console.log(check);
// }

export default onboard
