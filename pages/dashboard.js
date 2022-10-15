import { useRef, useState, useEffect } from 'react'
import { formatData } from '../lib/dashboard'
import CryptoDashboard from '../components/CryptoDashboard'

const Dashboard = () => {
  const [currencies, setcurrencies] = useState([])
  const [pair, setpair] = useState('')
  const [price, setprice] = useState('0.00')
  const [pastData, setpastData] = useState({})
  const ws = useRef(null)

  const first = useRef(false)
  const url = 'https://api.pro.coinbase.com'

  useEffect(() => {
    ws.current = new WebSocket('wss://ws-feed.pro.coinbase.com')

    let pairs = []

    const apiCall = async () => {
      await fetch(url + '/products')
        .then((res) => res.json())
        .then((data) => (pairs = data))

      let filtered = pairs.filter(pair => {
        if (pair.quote_currency === 'USD') {
          return pair
        }
        return false
      })

      filtered = filtered.sort((a, b) => {
        if (a.base_currency < b.base_currency) {
          return -1
        }
        if (a.base_currency > b.base_currency) {
          return 1
        }
        return 0
      })

      setcurrencies(filtered)
      first.current = true
    }

    apiCall()
  }, [])

  useEffect(() => {
    if (!first.current) {
      return
    }

    const msg = {
      type: 'subscribe',
      product_ids: [pair],
      channels: ['ticker'],
    }
    const jsonMsg = JSON.stringify(msg)
    ws.current.send(jsonMsg)

    const historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`
    const fetchHistoricalData = async () => {
      let dataArr = []
      await fetch(historicalDataURL)
        .then((res) => res.json())
        .then((data) => (dataArr = data))

      const formattedData = formatData(dataArr)
      setpastData(formattedData)
    }
    fetchHistoricalData()

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data)
      if (data.type !== 'ticker') {
        return
      }

      if (data.product_id === pair) {
        setprice(data.price)
      }
    }
  }, [pair])

  const handleSelect = (e) => {
    const unsubMsg = {
      type: 'unsubscribe',
      product_ids: [pair],
      channels: ['ticker'],
    }
    const unsub = JSON.stringify(unsubMsg)

    ws.current.send(unsub)
    setpair(e.target.value)
  }

  return (
    <div className=''>
      <h1 className='text-4xl mb-8'>Dashboard</h1>

      <select name='currency' value={pair} onChange={handleSelect}>
        {currencies.map((cur, idx) => {
          return (
            <option key={idx} value={cur.id}>
              {cur.display_name}
            </option>
          )
        })}
      </select>

      <CryptoDashboard price={price} data={pastData} />
    </div>
  )
}

export default Dashboard
