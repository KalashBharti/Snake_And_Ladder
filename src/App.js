
import React, { useState,useRef } from 'react';
import './App.css';
import GameWin from './Components/GameWin'
import Game from './Components/Game'
import GameMenu from './Components/GameMenu';
import DisplayTurn from './Components/DisplayTurn';

function App() {

  const [won, setWon] = useState(false);
  const [playerNumber,setPlayerNumber] = useState(1);
  const PlayerNames = useRef([]);
  const [winner ,setWinner] = useState("")
  const [menuDisplay ,setMenuDisplay] = useState(true);
  const [PlayerTurnName ,setPlayerTurnName] = useState("player");
  const [PlayerTurnColor ,setPlayerTurnColor] = useState(0);
 
  return (
    <div className="background ">
      <DisplayTurn name={PlayerTurnName} color={PlayerTurnColor}/>
      {won ? <GameWin name={winner} /> : ""}
      {!menuDisplay? <Game setPlayerTurnColor={setPlayerTurnColor} setPlayerTurnName={setPlayerTurnName} setWinner={setWinner} playerNumber={playerNumber}  PlayerNames={PlayerNames} setWon={setWon}/>:""}
    {menuDisplay?<GameMenu PlayerNames={PlayerNames} setMenuDisplay={setMenuDisplay} setPlayerNumber={setPlayerNumber}/>:""}
     
      
    </div>
  );

}
export default App;
