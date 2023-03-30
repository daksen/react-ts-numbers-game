import { useReducer } from "react";
import GameContext from "./GameContext";
import gameReducer from "./gameReducer";
import { GameState } from "../interfaces/interfaces";
import { 
  getInitialNumbersList, 
  getSelectableIndex, 
  getUniqueRandomNumber, 
  replaceIndexValue
} from "../utils";

const INITIAL_STATE: GameState = {
  initialized: false,
  currentNumber: null,
  numbersList: [],
  selectableIndex: null,
  successProbability: null,
  settings: {
    numbersCount: 10,
    minNumber: 1,
    maxNumber: 999,
  }
}

interface GameContextProviderProps {
  children: JSX.Element
}

const init = (initialState: GameState) => {
  return initialState;
}

const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [gameState, dispatch] = useReducer(gameReducer, INITIAL_STATE, init);

  const initGame = () => {
    const { numbersCount, minNumber, maxNumber } = gameState.settings;
    const initialCurrentNumber = Math.floor((Math.random() * maxNumber) + minNumber);
    const initialNumbersList = getInitialNumbersList(numbersCount);
    dispatch({ type: 'initGame', payload: { initialCurrentNumber, initialNumbersList }});
  }

  const restartGame = () => {
    const { numbersCount, minNumber, maxNumber } = gameState.settings;
    const initialCurrentNumber = Math.floor((Math.random() * maxNumber) + minNumber);
    const initialNumbersList = getInitialNumbersList(numbersCount);
    dispatch({ type: 'restartGame', payload: { initialCurrentNumber, initialNumbersList }});
  }

  const gameSettings = () => {
    dispatch({ type: 'gameSttings' });
  }

  const setSelectableIndex = () => {
    const { numbersList, currentNumber } = gameState;
    const newSelectableIndex = getSelectableIndex(numbersList, currentNumber);
    dispatch({ type: 'setSelectableIndex', payload: { newSelectableIndex }});
  }

  const setIndexValue = (index: number) => {
    const { numbersList, currentNumber, settings } = gameState;
    const { numbersCount, minNumber, maxNumber } = settings;
    const newNumbersList = replaceIndexValue(index, numbersList, currentNumber);
    const newCurrentNumber = getUniqueRandomNumber(newNumbersList, minNumber, maxNumber, numbersCount);
    dispatch({ type: 'setIndexValue', payload: { newCurrentNumber, newNumbersList }});
  }

  return (
    <GameContext.Provider 
      value={{
        gameState,
        initGame,
        restartGame,
        gameSettings,
        setSelectableIndex,
        setIndexValue,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
