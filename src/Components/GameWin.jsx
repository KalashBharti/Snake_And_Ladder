import {React} from 'react'

export default function GameWin({name}) {
    const refresh = () =>{
        window.location.reload(true);
    }
  return (
    
    <div className='gameWin'>
        <div className="container">
            <label className='headLabel' >{name}</label>
            <h2 className='youSigma'>You are the Sigma</h2>
            
            <button type='submit' className='restart'onClick={refresh}  >play again
            <i className="restart ri-refresh-line"></i>
            </button>
            {/* <button className='restart'>Play Again</button> */}

        </div>
      
    </div>
  )
}
