import React from 'react'

function Square({id,revealSquares}) {
  const clickSquare = (e) => 
  {    
    revealSquares(e.currentTarget.id, e.currentTarget)
  }
  return (
    <div id={id} className="cell" onClick={(e) => clickSquare(e)}>
        <p className='square_id'>{id}</p>
        <div className='symbolDiv'>
          <p className="symbol"></p>
        </div>
    </div>
  )
}

export default Square