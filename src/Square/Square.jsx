import React from 'react'

function Square({id,revealSquares}) {
  const clickSquare = (e) => 
  {    
    revealSquares(e.currentTarget.id, e.currentTarget)
  }
  return (
    <div id={id} className="cell" onClick={(e) => clickSquare(e)}>
        <p className="symbol"></p>
        <p className="symbol">{id}</p>
    </div>
  )
}

export default Square