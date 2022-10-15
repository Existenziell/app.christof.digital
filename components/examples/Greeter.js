import GreeterContract from '../../src/artifacts/contracts/Greeter.sol/Greeter.json'
import { useState, useRef } from 'react'
import { ethers } from 'ethers'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'

export const Greeter = () => {
  const [receiving, setReceiving] = useState(false)
  const [greeting, setGreetingState] = useState('')
  const [newGreeting, setNewGreetingState] = useState('')
  const [greetingMessage, setGreetingMessageState] = useState('')
  const newGreetingInputRef = useRef()

  // Call smart contract, fetch current value
  async function fetchGreeting() {
    setReceiving(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_GREETER_ADDRESS, GreeterContract.abi, provider)
    try {
      const data = await contract.greet()
      setGreetingState(data)
      setGreetingMessageState(`Blockchain response: ${data}`)
      setReceiving(false)
    } catch (error) {
      console.log(error)
    }
  }

  // Call smart contract, set new value
  async function setGreeting() {
    if (!newGreeting) {
      setGreetingMessageState('Add a new greeting first.')
      return
    }
    setReceiving(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_GREETER_ADDRESS, GreeterContract.abi, signer)
    const transaction = await contract.setGreeting(newGreeting)
    await transaction.wait()
    greeting
      ? setGreetingMessageState(`Greeting updated from "${greeting}" to "${newGreeting}".`)
      : setGreetingMessageState(`Greeting updated to "${newGreeting}".`)
    newGreetingInputRef.current.value = ''
    setGreetingState('')
    setNewGreetingState('')
    setReceiving(false)
  }

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <div className="flex gap-4">
        <button className="button" onClick={fetchGreeting} disabled={receiving}>
          Fetch greeting from the blockchain
        </button>
        <input type='text' disabled
          placeholder="Fetched greeting"
          value={greeting}
          className='bg-white'
        />
      </div>

      <div className="flex gap-4">
        <input type='text' disabled={receiving}
          className="border p-4 text-center"
          onChange={e => setNewGreetingState(e.target.value)}
          placeholder="Write a new greeting"
          ref={newGreetingInputRef}
        />
        <button className="button" onClick={setGreeting} disabled={receiving}>
          Set new greeting on the blockchain
        </button>
      </div>

      {receiving ?
        <>
          <div className='flex dark:hidden mt-8'>
            <ClimbingBoxLoader size={15} color='var(--color-brand-dark)' />
          </div>
          <div className='hidden dark:flex mt-8'>
            <ClimbingBoxLoader size={15} color='var(--color-brand)' />
          </div>
        </>
        :
        <div className="border border-brand-dark dark:border-brand p-4">
          {greetingMessage && <span>{greetingMessage}</span>}
        </div>
      }
    </div>
  )
}
