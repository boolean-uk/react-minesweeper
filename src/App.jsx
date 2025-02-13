import { useState, createContext } from "react";
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
    nrRow   : 10   
  })

  return (
    <>
      <h1>React Minesweeper</h1>
      <div >
        <GameContext.Provider value={{options,setOptions}}>
          <GamePanel />
          <SquareBoard />
        </GameContext.Provider>
      </div>

    </>
  );
}

export default App;
