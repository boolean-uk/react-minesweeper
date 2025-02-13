import React, {useContext} from 'react'
import { GameContext } from '../App'

function GamePanel() {
  const {options,setOptions} = useContext(GameContext)
  const handleChange = (e) => {
    if (!e.currentTarget.max)
      setOptions({...options,[e.currentTarget.name]:Number(e.currentTarget.value) })
    else if (Number(e.currentTarget.value) <= Number(e.currentTarget.max))
      setOptions({...options,[e.currentTarget.name]:Number(e.currentTarget.value) })
    else 
      setOptions({...options,[e.currentTarget.name]:Number(e.currentTarget.max) })
  }
  return (
    <div id="gamepanel" >
        <div className='HUD'>
          <label>Bombs</label>
          <input type="number" min={1} max={options.nrCol*options.nrRow} name={"nrMines"} value={options.nrMines}  onChange={(e) =>handleChange(e)}  ></input>
          
          <label>Columns</label>
          <input type="number" min={1} name={"nrCol"} value={options.nrCol}  onChange={(e) =>handleChange(e)}  ></input>
          
          <label>Rows</label>
          <input type="number" min={1} name={"nrRow"} value={options.nrRow}  onChange={(e) =>handleChange(e)}  ></input>
          
        </div>
    </div>
  )
}

export default GamePanel