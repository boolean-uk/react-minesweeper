import React, {useRef} from 'react'
import Square from "../Square/Square"

function SquareBoard() {
  const mineArrayRef = useRef(null)
  const rowLenRef = useRef(25)
  const colLenRef = useRef(25)
  const nrMinesRef = useRef(100)
  const pickMineSquares = () =>
  {
    if(mineArrayRef.current != null) return;
    let mineIds = Array.from({length:nrMinesRef.current},(x) => 
      {return Math.floor(Math.random()*(rowLenRef.current*colLenRef.current))}
    );
    mineArrayRef.current = mineIds;
  }

  const generateSquares = () =>
  {
    pickMineSquares();
    let squarIt = new Array(rowLenRef.current*colLenRef.current).fill("");
    return (squarIt.map((x, index) => (
      <Square key={index} id={index}  revealSquares={revealSquares}/>
    )));
  }

  const gameOver = () => 
  {
    for (let i in mineArrayRef.current)
    {
      let squareElem = document.getElementById(mineArrayRef.current[i]);
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
    if(mineArrayRef.current.includes(nid))
      gameOver()
    else
    {
    
      let c_index = (nid %  (colLenRef.current));
      let r_index = Math.floor(nid / (rowLenRef.current) );
      
      let c_trav_from = Math.max(c_index-1,0);
      let c_trav_to   = Math.min(c_index+1,colLenRef.current-1);
      let r_trav_from = Math.max(r_index-1,0);
      let r_trav_to   = Math.min(r_index+1,rowLenRef.current-1);
      let visit = [];
      let mine_count = 0; 
      for (let i = r_trav_from; i <= r_trav_to; i++)
      {
        for(let j = c_trav_from; j <= c_trav_to; j++)
        {
          let travId = (i*rowLenRef.current) + j;
          if(travId != nid)
            visit.push(travId);

          if(mineArrayRef.current.includes(travId))
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
    {/* <div style={{gridTemplateColumns:colLenRef}} className='container' > */}
    <div style={{gridTemplateColumns:`repeat(${colLenRef.current},35px)`}} className='container' >
      {generateSquares()}
    </div>
    </>
  )
}

export default SquareBoard