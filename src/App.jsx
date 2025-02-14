import { useState, useRef, createContext } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SquareBoard from "./SquareBoard/SquareBoard";
import GamePanel from "./GamePanel/GamePanel";

export const GameContext = createContext();

function App() {
  const [options, setOptions] = useState({
    nrMines : 10,     
    nrCol   : 10,     
    nrRow   : 10,
    playername: "",
    reset   : false,
    
  })
  const [started,setStarted] = useState(false);
  const [gameWon,setGameWon] = useState(false);
  const [gameOver,setGameOver] = useState(false);
  const [nrFlipped,setNrFlipped] = useState(0);

  return (
    <>
      <h1 id="gametitle">React Minesweeper</h1>
      <div id="effects">
        <GameContext.Provider value={{
            options,setOptions,
            started,setStarted,
            gameOver,setGameOver,
            nrFlipped,setNrFlipped,
            gameWon,setGameWon,
          }}>
          <GamePanel />
          <SquareBoard />
        </GameContext.Provider>
      </div>

    </>
  );
}

export default App;
