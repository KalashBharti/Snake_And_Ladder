import { React, useState } from 'react'
import "./components.css"
import Multiplayer from './Multiplayer'

export default function GameMenu({setMenuDisplay, setPlayerNumber,PlayerNames}) {
    const [multyplayerMenu, setMultyplayerMenu] = useState(false);
    const toggleMenu= ()=>{
        setMenuDisplay(false);
    }
    return (
        <div className='container menu'>
            <label > <span>
                Welcome to Snake &  Ladder
            </span>
            </label>
            <hr />
            <div className="container menu-button">

                {multyplayerMenu ?<Multiplayer PlayerNames={PlayerNames} setMenuDisplay={setMenuDisplay} setPlayerNumber={setPlayerNumber} /> :<>
                 <button className='jelly-btn' onClick={toggleMenu}>
                    <span>Single Player</span>
                </button>
                <button className=' mt-4 jelly-btn' onClick={(e)=>setMultyplayerMenu(true)}>
                    <span>Multiplayer Player</span>
                </button>
                </>
                }

            </div>
        </div>
    )
}
