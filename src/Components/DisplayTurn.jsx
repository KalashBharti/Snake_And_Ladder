import React, { useRef } from 'react'

export default function DisplayTurn({name,color}) {
    const colors = useRef(["red","green","blue"])
  return (
    <div className='display-turn'>
        <div>
             <span className='turn-name' >Name:</span>
             <span className='turn-name' >{name}</span>

        </div>
        <div>
             <span className='turn-name' >Color:</span>
             <span className='turn-name' style={{color:`${colors.current[color]}`}}  >{colors.current[color]}</span>

        </div>
    </div>
  )
}
