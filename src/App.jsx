import { useState } from 'react'
import './assets/reset.css'
import './assets/style.css'




function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [box, setBox] = useState(Array(9).fill(null));
  const [isDraw,  setIsDraw] = useState(false);
  const [isBot, setIsBot]  = useState(false);
  const [isPlayer, setIsPlayer]  = useState('Player 2');
  const [scorePlayer1, setScorePlayer1] = useState(0);
  const [scorePlayer2, setScorePlayer2] = useState(0);

  function handleClick(i) {
  const player = xIsNext ?  '✖️' : '⭕';
  if (box[i] || calculateGamePlay(box)) {
      return;
    }
    box[i] = player;
    setXIsNext(!xIsNext);

    if (box.every((val) => val !== null)) {
      setIsDraw(true);
    }

    if (calculateGamePlay(box)) {
      return;
    }


if (isBot) {
    setTimeout((val) => {
      for (let j = 0; j < 100; j++) {
        const rndm = Math.floor((Math.random() * 9));
        if (box[rndm] == null) {
          box[rndm] = "⭕";
          setXIsNext(xIsNext);
          console.log(box);
          return;
        }
      }
  }, 500);
}
  }

  

  function theWinner() {
    let hasil = '';

    if (calculateGamePlay(box)) {
      if (box[calculateGamePlay(box)[0]] == '✖️') {
        hasil = 'Player 1 is Win!';
      }else{
        hasil = isPlayer + ' is Win!';
      }
    }else{
      hasil = xIsNext ? 'Player 1 Turn : ✖️' : isPlayer + " Turn : ⭕";
    }

    if (isDraw && !calculateGamePlay(box)) {
      hasil = 'Draw!';
    }

    return hasil;
  }

  function reset() {
    setBox(Array(9).fill(null));
    setIsDraw(false);
    setXIsNext(true);
  }

  function winColor(winArr) {
    for (let j = 0; j < calculateGamePlay(box).length; j++) {
      if (winArr == calculateGamePlay(box)[j]) {
        return{
          backgroundColor : '#9fee9d'
        } 
      }
    }
  }

  function handleBot(){
    reset();
    setIsBot(true);
    setIsPlayer('BOT');
  }


  function handlePlayer(){
    reset();
    setIsBot(false);
    setIsPlayer('Player 2');
  }




  return(
    <>
    <div className='temp-body'>
    <button onClick={handlePlayer} className='btn'>Player Vs Player</button>
    <button onClick={handleBot} className='btn'>Player Vs Bot</button>
    <h3 className='title'>You Are Playing with {isPlayer}</h3>
    <h4 className='title'>{theWinner()}</h4>
    <div className="boards">
    {box.map((val, i) => {
      return(
      <div className="box" onClick={() => handleClick(i)} key={i} style={winColor(i)}>
        {box[i]}
      </div>)
    })}
    </div>
    <div className="score">
    <div className='scorePlayer1'>Score Player 1 : {scorePlayer1}</div>
    <button onClick={reset} className='btn-reset'>Reset</button>
    <div className='scorePlayer1'>Score {isPlayer} : {scorePlayer2}</div>
    </div>
    
    </div>
    </>
  )

}

const calculateGamePlay = (box) =>{
  const square = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (let i = 0; i < square.length; i++) {
    const [a,b,c] = square[i];
    
    if (box[a] && box[a] === box[b] && box[b] === box[c]) {
      return square[i];
      
    }
  }

  return false;

}


export default App
