import { useContext, useEffect } from 'react';
import GameContext from '../context/GameContext';
import CardComponent from './CardComponent';

const GameInitialized = () => {

  const { gameState, setSelectableIndex } = useContext(GameContext);

  useEffect(() => {
    if (gameState.currentNumber) {
      setSelectableIndex();
    }
  }, [gameState.currentNumber]);
  
  return (
    <div className="container">
      <h1 className="title">{gameState?.currentNumber || ''}</h1>
      <div className="wrapper">
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
    </div>
  );
}

export default GameInitialized;
