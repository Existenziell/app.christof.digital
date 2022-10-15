import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ethers } from 'ethers'
import { hasEthereum } from '../lib/ethereum'
import { Greeter } from '../components/examples/Greeter'
import { Example1 } from '../components/examples/Example1'
import { Example2 } from '../components/examples/Example2'
import { ConnectWallet } from '../components/ConnectWalletBtn'
// import { onboard } from '../lib/onboard'

export default function Root({ chainIds }) {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isCorrectChain, setIsCorrectChain] = useState(false)
  const [connectedWalletAddress, setConnectedWalletAddress] = useState('')
  const [networkInfo, setNetworkInfo] = useState('')
  const [example, setExample] = useState()
  const router = useRouter()

  const examples = [
    { name: 'Greeter', id: 0 },
    { name: 'Example1', id: 1 },
    { name: 'Example2', id: 2 },
  ]

  useEffect(() => {
    if (!hasEthereum()) {
      setConnectedWalletAddress(`MetaMask unavailable. Please install to proceed.`)
      setIsWalletConnected(false)
      return
    }

    const getNameFromChainId = (chainId) => {
      if (chainId === 1337) return 'Local (1337)'
      const network = chainIds.filter(c => (c.chainId === chainId))
      return network[0].name
    }

    async function setAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const userNetwork = await provider.getNetwork()
      const signer = provider.getSigner()
      const networkInfo = getNameFromChainId(userNetwork.chainId)

      if (userNetwork.chainId !== 3) {
        // const check = await onboard.walletCheck()
        // console.log(check);
        setNetworkInfo('Please change network to Ropsten Testnet.')
        setIsCorrectChain(false)
      } else {
        setNetworkInfo(networkInfo)
        setIsCorrectChain(true)
      }

      try {
        const signerAddress = await signer.getAddress()
        setConnectedWalletAddress(signerAddress)
        setIsWalletConnected(true)
      } catch {
        setIsWalletConnected(false)
        setConnectedWalletAddress('')
      }
    }
    setAddress()

    window.ethereum.on('connect', (accounts) => {
      // console.log('Connected', accounts)
      // router.reload(window.location.pathname)
    })

    window.ethereum.on('accountsChanged', (accounts) => {
      // console.log('accountsChanged', accounts)
      router.reload(window.location.pathname)
    })

    window.ethereum.on('chainChanged', (chainId) => {
      const id = parseInt(chainId, 16)
      if (id !== 3) {
        setNetworkInfo('Please change network to Ropsten Testnet.')
        setIsCorrectChain(false)
      } else {
        setNetworkInfo(getNameFromChainId(parseInt(chainId, 16)))
        setIsCorrectChain(true)
      }
      // router.reload(window.location.pathname)
    })
  }, [chainIds, router, example])

  return (
    <div className='mx-auto text-center px-2 md:px-8'>

      {!isWalletConnected &&
        <ConnectWallet styles='absolute top-5 left-24' />
      }

      <h1 className='text-2xl md:text-4xl mb-1'>app.christof.digital</h1>
      <p className='mb-8'>Playground for smart contract interactions</p>
      <Image src='/icons/programming.svg' width={300} height={150} alt='Contract' />

      <div className='p-4 border border-brand-dark dark:border-brand mt-8 overscroll-x-none'>
        {connectedWalletAddress
          ? <p>Connected wallet: <span className='text-xs'>{connectedWalletAddress}</span></p>
          : <ConnectWallet />
        }
        {networkInfo && <p className='text-md mt-4'>Network: {networkInfo}</p>}
      </div>

      {isWalletConnected && isCorrectChain &&
        <>
          <h2 className='text-lg mt-10 mb-2'>Examples:</h2>
          <div className='mb-10 max-w-max mx-auto'>
            {examples.map(ex => (
              <div className='' key={ex.id}>
                <button onClick={() => { ex.id !== example ? setExample(ex.id) : setExample(false) }} className='link cursor-pointer'>{ex.name}</button>
              </div>
            ))}
          </div>

          <div className='example border border-brand-dark dark:border-brand p-4'>
            {example === 0 &&
              <Greeter />
            }
            {example === 1 &&
              <Example1 />
            }
            {example === 2 &&
              <Example2 />
            }
          </div>
        </>
      }
    </div>
  )
}

export async function getStaticProps(ctx) {
  const res = await fetch('https://chainid.network/chains.json')
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { chainIds: data },
  }
}
