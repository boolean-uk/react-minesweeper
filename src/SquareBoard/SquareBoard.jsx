import React, {useRef,useState, useContext, useEffect} from 'react'
import Square from "../Square/Square"
import { GameContext } from '../App'

function SquareBoard() {
  const {options, setOptions,started,setStarted, gameOver,setGameOver, setNrFlipped} = useContext(GameContext)
  const [mineArray, setMineArray] = useState(null)
  const [squareArray, setSquareArray] = useState([])
  const [rowLen, setRowLen]   = useState(0)
  const [colLen, setColLen]   = useState(0)
  const [clear,  setClear]    = useState(false)
  const [flippedTiles, setFlippedTiles] = useState([])
  useEffect(() => {
    
    setRowLen(options.nrRow);
    setColLen(options.nrCol);
    setSquareArray(Array.from({length:options.nrRow*options.nrCol}, x => ""));
    pickMineSquares(options.nrMines, options.nrRow, options.nrCol);
    if (options.reset == true)
      setOptions({...options, reset:false});
    setClear(true);
    
  },
  [options]
  );

  useEffect(() => {
    if(clear)
      setClear(false);
  },
  [clear]
  );

  const pickMineSquares = (_nrMines, rows,cols) =>
  {
    let tempSquares = Array.from({length:rows*cols},(x,index) => {return index });

    let mineIds = Array.from({length:options.nrMines},(x) => 
      {
        let r = Math.floor(Math.random()*(tempSquares.length));
        let pickedIndex = tempSquares[r];
        tempSquares = [...tempSquares.filter((x,index) => index !== r )]
        return pickedIndex;
      }
    );
    setMineArray(mineIds);
  }

  const sleep = (ms) => {
    return new Promise(t => setTimeout(t, ms));
  }
  const triggerGameOver = async (bombId) => 
  {
    
    // Placing pressed bomb first will result in a more pleasent animation
    let tempArr = [bombId,...mineArray.filter(x => x != bombId)];
    for (let i in tempArr)
    {
      let squareElem = document.getElementById(tempArr[i]);
      var curSymbol = squareElem.getElementsByClassName("symbol")[0];
      curSymbol.innerText = "💣";
      curSymbol.parentElement.parentElement.style.backgroundColor = "red";
      curSymbol.style.textShadow = "rgb(255 240 55) 0px 0px 5px";
      curSymbol.parentElement.parentElement.classList.add("blowUp")
      curSymbol.classList.add("blowUp")
      await sleep(50);
    }
    setGameOver(true);
  }

  const revealSquares = async(id, squareElem, visited = []) =>
  {
    if (gameOver) return;
    if (!started) setStarted(true);
    let nid =Number(id);
    if (visited.includes(nid)) return;
    var curSymbol = squareElem.getElementsByClassName("symbol")[0];
    curSymbol.parentElement.style.backgroundColor= "antiquewhite";
    curSymbol.setAttribute("flipped",true);
    if (!flippedTiles.includes(id))
    {
      let newFlippedTilesArr= [...flippedTiles,id ];
      setFlippedTiles(newFlippedTilesArr);
      setNrFlipped(newFlippedTilesArr.length);
      document.getElementById(id).classList.add("swell");
    }

    if(mineArray.includes(nid))
      triggerGameOver(nid)
    else
    {
    
      let c_index = (nid %  (colLen));
      let r_index = Math.floor(nid / (colLen) );

      
      let c_trav_from = Math.max(c_index-1,0);
      let c_trav_to   = Math.min(c_index+1,colLen-1);
      let r_trav_from = Math.max(r_index-1,0);
      let r_trav_to   = Math.min(r_index+1,rowLen-1);
      let visit = [];
      let mine_count = 0; 
      for (let i = r_trav_from; i <= r_trav_to; i++)
      {
        for(let j = c_trav_from; j <= c_trav_to; j++)
        {
          let travId = (i*colLen) + j;
          if(travId != nid)
            visit.push(travId);

          if(mineArray.includes(travId))
            mine_count++;
        }
      }
      console.log(visit);
      console.log(mine_count);
      visited.push(nid);
      if (mine_count == 0)
      {
        for(let i in visit)
        {
          revealSquares(visit[i],document.getElementById(visit[i]), visited);
          document.getElementById(visit[i]).classList.add("swell_spin_dance");
          await sleep(5);
        }
      }
      
      curSymbol.innerText = mine_count;
      
      let color = mine_count == 0 ? "white" 
          : mine_count == 1 ? "green" 
          : mine_count == 2 ? "blue" 
          : mine_count == 3 ? "yellow" 
          : mine_count == 4 ? "red" 
          : mine_count > 4 ? "magenta" :""
          ; 
      curSymbol.style["color"] = color;
      
    }
  }

  const stupidFunc = () => {
    if (clear) 
    {
      return (<></>);
    }
    else 
      return squareArray.map((x,index) => {
          return (<Square key={index} id={index}  revealSquares={revealSquares}/>);
        })
  }

  return (
    <>
    <div style={{gridTemplateColumns:`repeat(${colLen},35px)`}} className='container' >
      {stupidFunc()}
    </div>
    </>
  )
}

export default SquareBoard