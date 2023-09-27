import React, { useEffect, useState, useCallback, useRef } from 'react';
import boardIMG from '../img/board.jpg'
import diceImg from '../img/dice.gif'
import dice1 from "../img/dice_numbers/dice_1.png"
import dice2 from "../img/dice_numbers/dice_2.png"
import dice3 from "../img/dice_numbers/dice_3.png"
import dice4 from "../img/dice_numbers/dice_4.png"
import dice5 from "../img/dice_numbers/dice_5.png"
import dice6 from "../img/dice_numbers/dice_6.png"
import audio1 from "../sound/move.mp3";
import audio2 from "../sound/ladder.mp3";
import audio3 from "../sound/snake.mp3";
import audio4 from "../sound/dice.mp3";
import audio5 from "../sound/win.mp3";
import Place from '../Class/Place';
import Player from "../Class/Player"
import '../App.css';

export default function Game({ setPlayerTurnName,setPlayerTurnColor,setWinner,setWon, PlayerNames, playerNumber }) {

  const [diceMove, setDicemove] = useState(false);

  const [diceNum, setDiceNumber] = useState(0);  //dice index will be from 0 to 5  
  const dices = useRef([dice1, dice2, dice3, dice4, dice5, dice6]);

  //hows turn
  const [playerNumTurn, setPlayerNumTurn] = useState(0)
  const board = useRef([]);
  // Player class array object
  const player = useRef([]);
  // dot pieces
  const pieces = useRef("");
  const pieces2 = useRef("");
  const pieces3 = useRef("");

  const PlayersPieces = useRef([pieces, pieces2, pieces3])
  const playerTurn = useRef(true);

  // Audios
  const piecesMoveAudio = useRef(new Audio(audio1));
  const ladderMove = useRef(new Audio(audio2));
  const snakeBitAudio = useRef(new Audio(audio3));
  const diceSuffle = useRef(new Audio(audio4));
  const gameWin = useRef(new Audio(audio5));

  useEffect(()=>{
    if(playerNumTurn === playerNumber){
      setPlayerNumTurn(0);
      setPlayerTurnColor(0);
    }
    
  },[playerNumTurn,setPlayerTurnName,playerNumber,setPlayerTurnColor])

  useEffect(() => {
   
    if (playerNumber === 1) {
      player.current.push(new Player("Player"));
    }
    else {
      for (let i = 0; i < playerNumber; i++) {

        player.current.push(new Player(PlayerNames.current[i]));
      }
    }
    setPlayerTurnName(player.current[0].name);
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        const place = new Place();
        row.push(place);
      }
      board.current.push(row);
    }
    console.log("board created");
    board.current[0][1].addTransfer(5, 0);
    board.current[1][8].addTransfer(4, 7);
    board.current[2][4].addTransfer(4, 2);
    board.current[3][5].addTransfer(5, 4);
    board.current[4][6].addTransfer(6, 9);
    board.current[5][2].addTransfer(8, 2);
    board.current[6][0].addTransfer(9, 2);
    board.current[7][6].addTransfer(9, 4);
    // ladder
    board.current[9][3].addTransfer(7, 4);
    board.current[8][7].addTransfer(5, 5);
    board.current[6][7].addTransfer(5, 8);
    board.current[5][9].addTransfer(3, 8);
    board.current[5][1].addTransfer(3, 2);
    board.current[3][1].addTransfer(1, 0);
    board.current[2][6].addTransfer(0, 8);
  },[]);

  // MovePieces 1 places every time
  const movePieces = useCallback((playerPos, target, step) => {
    if (target < step) {
      
      const currPos = player.current[playerNumTurn].getPos();
      let timedelay = 100;
      if (board.current[currPos[0]][currPos[1]].obstacle) {
        const [tx, ty] = board.current[currPos[0]][currPos[1]].getTranfer();
        currPos[0] < tx ? snakeBitAudio.current.play() : ladderMove.current.play();
        setTimeout(() => {

          player.current[playerNumTurn].setPos([tx, ty]);
          let x = (ty * 60) + "px";
          let y = ((9 - tx) * 60) + 10 + "px";
          PlayersPieces.current[playerNumTurn].current.style.marginLeft = x;
          PlayersPieces.current[playerNumTurn].current.style.marginBottom = y;

        }, 500);
        timedelay = 500;

        
      }
      else if (currPos[0] === 0 && currPos[1] === 0) {
        setWon(true);
        setWinner(player.current[playerNumTurn].name);
        gameWin.current.play();
      }
      setTimeout(() => {
        playerTurn.current = true;
      }, timedelay);

      setPlayerNumTurn((e)=>e+1);
    console.log(playerNumTurn);
    setPlayerTurnName(player.current[playerNumTurn+1].name);
    setPlayerTurnColor(playerNumTurn+1);
      return;
    }
    piecesMoveAudio.current.play();
    if (playerPos[0] % 2 === 1) {
      if (playerPos[1] === 9) {
        playerPos[0]--;
      }
      else {
        playerPos[1]++;
      }
    }
    else {
      if (playerPos[1] === 0) {
        playerPos[0]--;
      }
      else {
        playerPos[1]--;
      }
    }
    let x = (playerPos[1] * 60) + "px";
    let y = ((9 - playerPos[0]) * 60) + 10 + "px";
    PlayersPieces.current[playerNumTurn].current.style.marginLeft = x;
    PlayersPieces.current[playerNumTurn].current.style.marginBottom = y;
    player.current[playerNumTurn].setPos(playerPos);
    setTimeout(() => {
      movePieces(playerPos, target, step + 1);
    }, 500);


  }, [player, setWon,playerNumTurn,setPlayerTurnColor,setPlayerTurnName,setWinner])

  // Player flips dice
  const PlayerMove = useCallback(() => {

    if (!playerTurn.current) {
    
      return;
    }

    playerTurn.current = false;
    setDicemove(true);
    diceSuffle.current.play();
    const randomNumber = Math.floor(Math.random() * 6) + 1;
   
    setDiceNumber(randomNumber - 1);

    setTimeout(() => {
      setDicemove(false);
    }, 500);

    
    let playerPos = player.current[playerNumTurn].getPos();

    // when number is more then destination
    if (playerPos[0] === 0 && playerPos[1] - randomNumber < 0) {
      playerTurn.current = true;
      setPlayerNumTurn((e)=>e+1);
      setPlayerTurnColor(playerNumTurn+1);
      return;
    }

    setTimeout(() => {

      movePieces(playerPos, randomNumber, 1);
    }, 500);

    
    
  }, [player, movePieces,playerNumTurn,setPlayerNumTurn,setPlayerTurnColor])
  //  move piesces 1 place every time

  return (
    <div className="container game">

      <div className="board">
        <img src={boardIMG} alt="board" width={600} height={600} />

      </div>
      <div className='player container'>
        <div className='dot' style={{background:"red"}} ref={pieces} />
        {playerNumber>1 ?<div className='dot' style={{background:"green"}} ref={pieces2} />:""}
        {playerNumber>2 ?<div className='dot' style={{background:"blue"}} ref={pieces3} />:""}
       
      </div>
      <div className="dice" >
        {diceMove ? <img src={diceImg} width={100} alt='dive' /> : <img className='diceImage' src={dices.current[diceNum]} width={75} alt='dice' onClick={PlayerMove} />}

      </div>
    </div>
  )
}
