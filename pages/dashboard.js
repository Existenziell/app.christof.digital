import { useRef, useState, useEffect } from 'react'
import { formatData } from '../lib/dashboard'
import CryptoDashboard from '../components/CryptoDashboard'

const Dashboard = () => {
  const [currencies, setCurrencies] = useState([])
  const [pair, setPair] = useState('')
  const [price, setPrice] = useState('0.00')
  const [pastData, setPastData] = useState({})
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])
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

      setFiltered(filtered)
      setCurrencies(filtered)
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
      setPastData(formattedData)
    }
    fetchHistoricalData()

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data)
      if (data.type !== 'ticker') {
        return
      }

      if (data.product_id === pair) {
        setPrice(data.price)
      }
    }
  }, [pair])

  useEffect(() => {
    if (search !== '') {
      const searched = filtered.filter(c => c.display_name.toLowerCase().includes(search.toLowerCase()))
      setCurrencies(searched)
      first.current = true
    }
  }, [search, filtered])

  const handleSelect = (e) => {
    const unsubMsg = {
      type: 'unsubscribe',
      product_ids: [pair],
      channels: ['ticker'],
    }
    const unsub = JSON.stringify(unsubMsg)

    ws.current.send(unsub)
    setPair(e.target.value)
  }

  return (
    <div className='dashboard'>
      <h1 className='text-4xl md:text-6xl mb-6'>Dashboard</h1>
      <select name='currency' value={pair} onChange={handleSelect}>
        {currencies.map((cur, idx) => {
          return (
            <option key={idx} value={cur.id}>
              {cur.display_name}
            </option>
          )
        })}
      </select>
      <input
        type='text'
        name='search'
        placeholder='Filter'
        onChange={(e) => setSearch(e.target.value)}
        className='ml-4'
      />

      <CryptoDashboard price={price} data={pastData} />
    </div>
  )
}

export default Dashboard
