import { useContext, useEffect } from 'react';
import GameContext from '../context/GameContext';
import CardComponent from './CardComponent';

const GameInitialized = () => {

  const { gameState, restartGame, gameSettings, setSelectableIndex } = useContext(GameContext);

  useEffect(() => {
    if (gameState.currentNumber) {
      setSelectableIndex();
    }
  }, [gameState.currentNumber]);
  
  return (
    <section className="container">
      <div className="current-number">
        <h2>{gameState?.currentNumber || ''}</h2>
      </div>
      <div className="card-wrapper">
        { Array.isArray(gameState.numbersList) && gameState.numbersList.length > 0 && (
          gameState.numbersList.map((value, index) => (
            <CardComponent 
              key={index}
              value={value}
              index={index}
            />
          ))
        )}
      </div>
      <div className="button-wrapper">
        <button className="big-button" onClick={restartGame}>
          Restart
        </button>
        <button className="big-button" onClick={gameSettings}>
          Settings
        </button>
      </div>
    </section>
  );
}

export default GameInitialized;
