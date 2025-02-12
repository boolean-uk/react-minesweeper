import React, {useRef} from 'react'
import Square from "../Square/Square"

function SquareBoard() {
  const mineArrayRef = useRef(null)
  const rowLenRef = useRef(10)
  const colLenRef = useRef(10)
  const pickMineSquares = (nrMines) =>
  {
    if(mineArrayRef.current != null) return;
    let mineIds = Array.from({length:nrMines},(x) => 
      {return Math.floor(Math.random()*(rowLenRef.current*colLenRef.current))}
    );
    mineArrayRef.current = mineIds;
  }

  const generateSquares = () =>
  {
    pickMineSquares(10, rowLenRef.current, colLenRef.current);
    let squarIt = new Array(rowLenRef.current*colLenRef.current).fill("");
    return (squarIt.map((x, index) => (
      <Square key={index} id={index} revealSquares={revealSquares}/>
    )));
  }

  const revealSquares = (id, squareElem) =>
  {
    let nid =Number(id);
    if(mineArrayRef.current.includes(nid))
      squareElem.innerHTML = "B";
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
          let travId = (i*rowLenRef.current) + (j);
          if(travId != (nid))
            visit.push(travId);
        }
      }
      console.log(visit);
      squareElem.innerHTML = "0";
    }
  }
  return (
    <>
      {generateSquares()}
    </>
  )
}

export default SquareBoard