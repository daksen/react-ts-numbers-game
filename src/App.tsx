import { useContext } from 'react';
import GameContext from './context/GameContext';
import GameInitialized from './components/GameInitialized';
import GameSettings from './components/GameSettings';
import './App.css';

function App() {
  const { gameState } = useContext(GameContext);
  
  return (
    <main>
      <h1 className="game-title">Order The Numbers</h1>
      { gameState?.initialized ? (
        <GameInitialized />
      ) : (
        <GameSettings />
      )}
    </main>
  );
}

export default App;
