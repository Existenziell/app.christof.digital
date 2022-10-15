import { Line } from 'react-chartjs-2'

function CryptoDashboard({ price, data }) {
  const opts = {
    tooltips: {
      intersect: false,
      mode: 'index',
    },
    responsive: true,
    maintainAspectRatio: false,
  }
  if (price === '0.00') {
    return <h2 className='mt-2'>Please select a currency pair</h2>
  }
  return (
    <div className='dashboard'>
      <h2 className='mt-2 text-2xl'>{`$${price}`}</h2>
      <div className='h-[calc(100vh-390px)]'>
        <Line data={data} options={opts} />
      </div>
    </div>
  )
}

export default CryptoDashboard
