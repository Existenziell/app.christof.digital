import { useState } from 'react'
import Arrow from '../components/SVG/Arrow'
import Grid from '../components/SVG/Grid'
import Phone from '../components/SVG/Phone'

const Play = () => {
  const [drawing, setDrawing] = useState(false)
  return (
    <div className='flex flex-col items-center justify-center'>
      {!drawing ?
        <div className='flex flex-col items-center justify-center'>
          <Arrow setDrawing={setDrawing} />
          <Phone />
        </div>
        :
        <div className='max-h-[calc(50vh)]'>
          <Grid setDrawing={setDrawing} />
        </div>
      }
      <div className='h-32'>
      </div>
    </div>
  )
}

export default Play
