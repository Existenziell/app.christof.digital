import GreeterContract from '../../src/artifacts/contracts/Greeter.sol/Greeter.json'
import { useState, useRef } from 'react'
import { ethers } from 'ethers'

export const Greeter = () => {
  const [greeting, setGreetingState] = useState('')
  const [newGreeting, setNewGreetingState] = useState('')
  const [greetingMessage, setGreetingMessageState] = useState('')
  const newGreetingInputRef = useRef()

  // Call smart contract, fetch current value
  async function fetchGreeting() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(process.env.NEXT_PUBLIC_GREETER_ADDRESS, GreeterContract.abi, provider)
    try {
      const data = await contract.greet()
      setGreetingState(data)
      setGreetingMessageState(`Blockchain response: ${data}`)
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
    // await requestAccount()
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
  }

  return (
    <div className="flex flex-col gap-6 w-full items-center">
      <div className="flex gap-4">
        <button className="button" onClick={fetchGreeting}>
          Fetch greeting from the blockchain
        </button>
        <input type='text' disabled
          placeholder="Fetched greeting"
          value={greeting}
          className='bg-white'
        />
      </div>

      <div className="flex gap-4">
        <input type='text'
          className="border p-4 text-center"
          onChange={e => setNewGreetingState(e.target.value)}
          placeholder="Write a new greeting"
          ref={newGreetingInputRef}
        />
        <button className="button" onClick={setGreeting} >
          Set new greeting on the blockchain
        </button>
      </div>

      <div className="border border-dashed border-brand-dark dark:border-brand p-4">
        {greetingMessage && <span>{greetingMessage}</span>}
      </div>

    </div>
  )
}
