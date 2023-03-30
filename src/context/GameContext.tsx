import { createContext } from "react";
import { GameState } from "../interfaces/interfaces";

interface GameContextProps {
  gameState: GameState,
  initGame: () => void,
  setSelectableIndex: () => void,
  setIndexValue: (index: number) => void,
}

const GameContext = createContext<GameContextProps>({} as GameContextProps);

export default GameContext;
