import { useContext } from 'react';
import GameContext from './context/GameContext';
import GameInitialized from './components/GameInitialized';
import GameSettings from './components/GameSettings';
import './App.css';

function App() {
  const { gameState } = useContext(GameContext);
  
  return (
    <div className="main">
      <h1 className="title">Numbers Game</h1>
      { gameState?.initialized ? (
        <GameInitialized />
      ) : (
        <GameSettings />
      )}
    </div>
  );
}

export default App;
