import React, {useContext, useEffect, useState}from 'react'
import { GameContext } from '../App'

function Square({id,revealSquares}) {
  const {gameOver, gameWon, options, setFlags, flags} = useContext(GameContext)
  
 
  const clickSquare = (e) => 
  {
    console.log(e);
    if(e.button == 2)rightClickSquare(e);
    else if(e.button == 0)leftClickSquare(e);
    
  }
  const _setFlag = (squareelm) => {
    if (squareelm.innerText != "🚩" && squareelm.innerText.length == "")
    {
      if(flags == 0) return;
      squareelm.innerText = "🚩";
      setFlags(flags-1);
    }
    else if (squareelm.innerText == "🚩")
    {
      squareelm.innerText = "";
      setFlags(flags+1);
    }
  }
  const leftClickSquare = (e) => {
    var curSymbol = e.currentTarget.getElementsByClassName("symbol")[0];
    if (curSymbol.innerText != "🚩" && curSymbol.innerText.length == "")
      revealSquares(e.currentTarget.id, e.currentTarget)
    
  };
  const rightClickSquare = (e) => 
  {    
    e.preventDefault(); // Doesn't really work... (Keep in case of browser differences)
    if(gameOver || gameWon) return; 
    var curSymbol = e.currentTarget.getElementsByClassName("symbol")[0];
    _setFlag(curSymbol);
  }
  const mouseHover = (elm) => 
  {
    if (elm.classList.length > 1 || (gameOver || gameWon)) return; 
    elm.classList.add("cellHover");
  }
  const mouseNotHover = (elm) => 
  {
    if (elm.classList.contains("cellHover"))
      elm.classList.remove("cellHover");
  }

  // Prevent rightclick to open context menu...
  document.addEventListener("contextmenu", (event) => {
    if(event.target.classList.contains("symbol") || event.target.classList.contains("symbolDiv"))
      event.preventDefault();
  });

  
  return (
    <div id={id} className="cell" 
    onMouseDown={(e) => {clickSquare(e)}} 
      // onMouseDown={}
      onMouseEnter={(e) => mouseHover(e.currentTarget)}
      onMouseLeave={(e) => mouseNotHover(e.currentTarget)}
      >
        <p className='square_id'>{id}</p>
        <div className='symbolDiv'>
          <p className="symbol"></p>
        </div>
    </div>
  )
}

export default Square