import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SquareBoard from "./SquareBoard/SquareBoard";

function App() {
  return (
    <>
      <h1>React Minesweeper</h1>
      <SquareBoard />

    </>
  );
}

export default App;
