import { use, useEffect, useState } from "react";
import "./App.css";
import React from "react";
import { defaultAllowedOrigins } from "vite";

function App() {
  const [mines, setMines] = useState(10);
  const [dimension, setDimension] = useState(10);
  const [board, setBoard] = useState<Cell[][]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  //genereate the board
  const generateBoard = (): Cell[][] => {
    let board: Cell[][] = [];
    for (let i = 0; i < dimension; i++) {
      let row: Cell[] = [];
      for (let j = 0; j < dimension; j++) {
        row.push({
          x: i,
          y: j,
          neighbors: 0,
          isMine: false,
          isFlag: false,
          isRevealed: false,
        });
      }
      board.push(row);
    }
    return board;
  };

  //place mines on the board
  const placeMines = (board: Cell[][], mines: number) => {
    let newBoard = [...board];
    let count = 0;
    while (count < mines) {
      let x = Math.floor(Math.random() * dimension);
      let y = Math.floor(Math.random() * dimension);
      if (!newBoard[x][y].isMine) {
        newBoard[x][y].isMine = true;
        count++;
      }
    }
    return newBoard;
  };

  //get the neigbors of a cell
  const getNeigbors = (board: Cell[][], x: number, y: number) => {
    let neighbors = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        if (x + i >= 0 && x + i < dimension && y + j >= 0 && y + j < dimension) {
          if (board[x + i][y + j].isMine) neighbors++;
        }
      }
    }
    return neighbors;
  };

  //run the functions
  useEffect(() => {
    const board = placeMines(generateBoard(), mines);
    setBoard(board);
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        board[i][j].neighbors = getNeigbors(board, i, j);
      });
    });
    setGameStarted(false);
  }, [gameStarted]);

  //reveal cell
  function onClickCell(e: React.MouseEvent, x: number, y: number) {
    e.preventDefault();

    let newBoard = [...board];

    if (e.button === 0) {
      // Left-click
      if (newBoard[x][y].isFlag) return;
      newBoard[x][y].isRevealed = true;

      if (newBoard[x][y].isMine) {
        alert("Game Over");
        newBoard.forEach((row) => {
          row.forEach((cell) => {
            cell.isRevealed = true;
          });
        });
      }
      if (newBoard[x][y].isFlag) {
        newBoard[x][y].isRevealed = false;
      }
    } else if (e.button === 2) {
      // Right-click
      newBoard[x][y].isFlag = !newBoard[x][y].isFlag;
    }

    setBoard(newBoard);
  }

  return (
    <>
      <h1>React Minesweeper</h1>
      {/* Input the dimesnions */}
      <div className="input">
        <input
          type="number"
          placeholder="Enter the dimension"
          onChange={(e) => setDimension(parseInt(e.target.value))}
        />
        <input 
        type="number"
        placeholder="Enter the number of mines"
        onChange={(e) => setMines(parseInt(e.target.value))}
        />
        <button onClick={() => setGameStarted(true)}>New Game</button>
      </div>

      {/* Show board */}
      <div className="container">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <div
                key={j}
                className="cell"
                onClick={(e) => onClickCell(e, cell.x, cell.y)}
                onContextMenu={(e) => onClickCell(e, cell.x, cell.y)}
                style={
                  cell.isRevealed
                    ? { background: "darkgrey" }
                    : { background: "lightgrey" }
                }
              >
                {cell.isRevealed
                  ? cell.isMine
                    ? "💣"
                    : cell.neighbors == 0
                    ? null
                    : cell.neighbors
                  : cell.isFlag
                  ? "🚩"
                  : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
