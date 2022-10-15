export const formatData = (data) => {
  const finalData = {
    labels: [],
    datasets: [
      {
        label: 'Price',
        data: [],
        backgroundColor: 'black',
        borderColor: '#D6A269',
        fill: false,
      },
    ],
  }

  const dates = data.map((val) => {
    const ts = val[0]
    const date = new Date(ts * 1000)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const final = `${month}-${day}-${year}`
    return final
  })

  const priceArr = data.map((val) => {
    return val[4]
  })

  priceArr.reverse()
  dates.reverse()
  finalData.labels = dates
  finalData.datasets[0].data = priceArr

  return finalData
}
