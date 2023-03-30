import { useContext } from "react";
import GameContext from "../context/GameContext";

const GameSettings = () => {

  const { initGame } = useContext(GameContext);

  return (
    <div className="container">
      <button className="big-button" onClick={initGame}>
        Start Game
      </button>
    </div>
  );
}

export default GameSettings;
