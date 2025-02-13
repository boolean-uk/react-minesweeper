import React, {useRef,useState, useContext, useEffect} from 'react'
import Square from "../Square/Square"
import { GameContext } from '../App'

function SquareBoard() {
  const {options} = useContext(GameContext)
  const [mineArray, setMineArray] = useState(null)
  const [squareArray, setSquareArray] = useState([])
  const [rowLen, setRowLen]   = useState(0)
  const [colLen, setColLen]   = useState(0)
  useEffect(() => {
    
    setRowLen(options.nrRow)
    setColLen(options.nrCol)
    setSquareArray(Array.from({length:options.nrRow*options.nrCol}, x => ""));
    pickMineSquares(options.nrMines, options.nrRow, options.nrCol);

  },
  [options]
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

  const gameOver = () => 
  {
    for (let i in mineArray)
    {
      let squareElem = document.getElementById(mineArray[i]);
      var curSymbol = squareElem.getElementsByClassName("symbol")[0];
      curSymbol.innerText = "💣";
      curSymbol.parentElement.parentElement.style.backgroundColor = "red";
    }
  }

  const revealSquares = (id, squareElem, visited = []) =>
  {
    let nid =Number(id);
    if (visited.includes(nid)) return;
    var curSymbol = squareElem.getElementsByClassName("symbol")[0];
    curSymbol.parentElement.style.backgroundColor= "antiquewhite";
    if(mineArray.includes(nid))
      gameOver()
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
  return (
    <>
    <div style={{gridTemplateColumns:`repeat(${colLen},35px)`}} className='container' >
      {squareArray.map((x,index) => {

        return (
          <Square key={index} id={index}  revealSquares={revealSquares}/>
        );
      })}
    </div>
    </>
  )
}

export default SquareBoard