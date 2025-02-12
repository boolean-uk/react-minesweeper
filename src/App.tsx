import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import React from "react";

const boardSize = 10;
const numMines = 10;
const checkingDirections = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0], [1, 1]
];

function generateBoard() {
  let board = Array.from({ length: boardSize }, () =>
    Array.from({ length: boardSize }, () => ({
      mine: false,
      revealed: false,
      touchingMines: 0,
      flag: false,
    }))
  );

  let minesPlaced = 0;
  while (minesPlaced < numMines) {
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);

    if (!board[row][col].mine) {
      board[row][col].mine = true;
      minesPlaced++;
    }
  }


  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col].mine) continue;

      let mineCount = 0;

      checkingDirections.forEach(([x, y]) => {
        const newRow = row + x;
        const newCol = col + y;

        if (newRow >= 0 && newRow < boardSize && newCol >= 0 && newCol < boardSize) {
          if (board[newRow][newCol].mine){
            mineCount++;
          }
        }
      });
      board[row][col].touchingMines = mineCount;
    }
  }
  return board
}


function App() {
  const [board, setBoard] = useState(generateBoard());
  const [minesLeft, setMinesLeft] = useState(10);

  const revealCell = (row: number, col: number) => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));

    if (newBoard[row][col].mine) {
      newBoard.forEach(r => r.forEach(c => c.revealed = true));
      setBoard(newBoard);
      return; 
    }

    const revealQueue = [[row, col]];
    newBoard[row][col].revealed = true;

    while (revealQueue.length > 0){
      const [currentRow, currentCol] = revealQueue.shift()!;

      if (newBoard[currentRow][currentCol].touchingMines === 0) {
        checkingDirections.forEach(([x, y]) => {
          const newRow = currentRow + x;
          const newCol = currentCol + y;

          if (
            newRow >= 0 && newRow < boardSize &&
            newCol >= 0 && newCol < boardSize &&
            !newBoard[newRow][newCol].revealed
          ) {
            newBoard[newRow][newCol].revealed = true;

            if (newBoard[newRow][newCol].touchingMines === 0) {
              revealQueue.push([newRow, newCol]);
            }
          }
        });
    }
  }
      setBoard(newBoard)
};

  const setFlag = (row: number, col: number) => {
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));

    if (!newBoard[row][col].revealed) {
      newBoard[row][col].flag = !newBoard[row][col].flag;

    setMinesLeft(prev => prev + (newBoard[row][col].flag ? -1 : 1));
  }
  setBoard(newBoard)
};

  return (
    <>
      <h1 className="title">React Minesweeper</h1>
      <div className="title">
        Mines Left: {minesLeft}
      </div>
      <div className="board">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div 
              key={`${rowIndex}-${colIndex}`} 
              className={`cell ${cell.revealed ? "revealed" : ""}`}
              onClick={() => revealCell(rowIndex, colIndex)}
              onContextMenu={(e) => {
                e.preventDefault();
                setFlag(rowIndex, colIndex);
              }}
              >
              <p className={`symbol ${cell.revealed && !cell.mine ? "number" : ""}`}>
                {cell.revealed ?  (cell.mine ? "💣" : cell.touchingMines || "") : cell.flag ? "🚩" : ""}
                </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;