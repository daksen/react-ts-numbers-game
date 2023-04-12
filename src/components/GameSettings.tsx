import { useContext } from "react";
import GameContext from "../context/GameContext";

const GameSettings = () => {

  const { gameState, initGame, setNumberOfCells, setMinNumberValue, setMaxNumberValue } = useContext(GameContext);
  const { numberOfCells, minNumberValue, maxNumberValue } = gameState.settings;

  const handleNumberOfCellsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfCells(Number(e.target.value));
  }

  const handleMinNumberValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinNumberValue(Number(e.target.value));
  }

  const handleMaxNumberValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxNumberValue(Number(e.target.value));
  }

  return (
    <div className="container">
      <div className="inputs-wrapper">
        <div>
          <label htmlFor="number-of-cells">Number Of Cells</label>
          <input 
            type="number" 
            id="number-of-cells" 
            min="1" 
            value={numberOfCells} 
            onChange={handleNumberOfCellsChange} 
          />
        </div>
        <div>
          <label htmlFor="min-number-value">Min Number Value</label>
          <input 
            type="number"
            id="min-number-value"
            min="1"
            value={minNumberValue}
            onChange={handleMinNumberValueChange}
          />
        </div>
        <div>
          <label htmlFor="max-number-value">Max Number Value</label>
          <input 
            type="number"
            id="max-number-value"
            min="1"
            value={maxNumberValue}
            onChange={handleMaxNumberValueChange}
          />
        </div>
      </div>
      <button className="big-button" onClick={initGame}>
        Start Game
      </button>
    </div>
  );
}

export default GameSettings;
