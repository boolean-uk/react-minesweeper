import React, {useContext} from 'react'
import { GameContext } from '../App'

function GamePanel() {
  const {options,setOptions} = useContext(GameContext)
  const handleChange = (e) => {
    setOptions({...options,[e.currentTarget.name]:Number(e.currentTarget.value) })
  }
  return (
    <div id="gamepanel" >
        <div className='HUD'>
          <label>Bombs</label>
          <input type="number" name={"nrMines"} value={options.nrMines}  onChange={(e) =>handleChange(e)}  ></input>
          
          <label>Columns</label>
          <input type="number" name={"nrCol"} value={options.nrCol}  onChange={(e) =>handleChange(e)}  ></input>
          
          <label>Rows</label>
          <input type="number" name={"nrRow"} value={options.nrRow}  onChange={(e) =>handleChange(e)}  ></input>
          
        </div>
    </div>
  )
}

export default GamePanel