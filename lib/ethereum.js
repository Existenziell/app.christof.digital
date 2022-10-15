// Check for MetaMask wallet browser extension
function hasEthereum() {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'

  // if (window.ethereum) {
  //     handleEthereum();
  // } else {
  //     window.addEventListener('ethereum#initialized', handleEthereum, {
  //         once: true,
  //     });

  //     // If the event is not dispatched by the end of the timeout,
  //     // the user probably doesn't have MetaMask installed.
  //     setTimeout(handleEthereum, 3000); // 3 seconds
  // }

  // function handleEthereum() {
  //     const { ethereum } = window;
  //     if (ethereum && ethereum.isMetaMask) {
  //         console.log('Ethereum successfully detected!');
  //         return true
  //         // Access the decentralized web!
  //     } else {
  //         console.log('Please install MetaMask!');
  //         return false
  //     }
  // }
}

export { hasEthereum }
