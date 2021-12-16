import { useState } from 'react'
import Image from 'next/image'

export const ConnectWalletBtn = ({ styles }) => {
  const [overlayShown, setOverlayShown] = useState(false)

  // Request access to MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }
  return (

    <div>
      <button onClick={() => setOverlayShown(true)} className={`${styles} px-4 py-2 border border-brand-dark border-dashed dark:border-brand mb-4`}>Connect Wallet</button>
      {overlayShown &&
        <div className='flex items-center justify-center'>

          {/* Backdrop */}
          <div className="absolute top-0 left-0 right-0 bottom-0 z-20 w-full h-screen bg-black/50 backdrop-blur"></div>

          {/* Overlay */}
          <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 rounded-xl bg-white dark:bg-brand-dark max-w-2xl p-6'>
            <h1 className='text-2xl '>Connect your wallet</h1>
            <p className='text-sm mb-8'>By connecting your wallet, you agree to our Terms of Service and our Privacy Policy.</p>
            <div onClick={requestAccount} className='button flex items-center justify-between divide-x divide-dashed divide-brand dark:divide-brand-dark max-w-max mx-auto'>
              <span className='pr-4'>MetaMask</span>
              <div className='pl-4'><Image src='/icons/metamask.svg' alt='MetaMask' width={20} height={20} /></div>
            </div>
          </div>

          {/* Close Button */}
          <div className='absolute top-2 right-2 z-30'>
            <svg onClick={() => setOverlayShown(false)} xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 hover:scale-105 hover:text-brand transition-all cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>

        </div>
      }
    </div>
  )
}
