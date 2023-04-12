import { useReducer } from "react";
import GameContext from "./GameContext";
import gameReducer from "./gameReducer";
import { GameState } from "../interfaces/interfaces";
import { 
  getInitialNumbersList, 
  getSelectableIndex, 
  getUniqueRandomNumber, 
  replaceIndexValue,
  saveSettings
} from "../utils";

const INITIAL_STATE: GameState = {
  initialized: false,
  currentNumber: null,
  numbersList: [],
  selectableIndex: null,
  successProbability: null,
  settings: {
    numberOfCells: 10,
    minNumberValue: 1,
    maxNumberValue: 999,
  }
}

interface GameContextProviderProps {
  children: JSX.Element
}

const init = (initialState: GameState) => {
  const jsonSettings = localStorage.getItem("settings");
  if (jsonSettings) {
    const parsedSettings = JSON.parse(jsonSettings);
    initialState.settings = {
      numberOfCells: Number(parsedSettings.numberOfCells),
      minNumberValue: Number(parsedSettings.minNumberValue),
      maxNumberValue: Number(parsedSettings.maxNumberValue),
    }
  }
  return initialState;
}

const GameContextProvider = ({ children }: GameContextProviderProps) => {
  const [gameState, dispatch] = useReducer(gameReducer, INITIAL_STATE, init);

  const initGame = () => {
    const { numberOfCells, minNumberValue, maxNumberValue } = gameState.settings;
    const initialCurrentNumber = Math.floor((Math.random() * (maxNumberValue - minNumberValue + 1)) + minNumberValue);
    const initialNumbersList = getInitialNumbersList(numberOfCells);
    dispatch({ type: 'initGame', payload: { initialCurrentNumber, initialNumbersList }});
  }

  const restartGame = () => {
    const { numberOfCells, minNumberValue, maxNumberValue } = gameState.settings;
    const initialCurrentNumber = Math.floor((Math.random() * (maxNumberValue - minNumberValue + 1)) + minNumberValue);
    const initialNumbersList = getInitialNumbersList(numberOfCells);
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
    const { numberOfCells, minNumberValue, maxNumberValue } = settings;
    const newNumbersList = replaceIndexValue(index, numbersList, currentNumber);
    const newCurrentNumber = getUniqueRandomNumber(newNumbersList, minNumberValue, maxNumberValue, numberOfCells);
    dispatch({ type: 'setIndexValue', payload: { newCurrentNumber, newNumbersList }});
  }

  const setNumberOfCells = (value: number) => {
    const { settings } = gameState;
    const newSettings = { ...settings, numberOfCells: value };
    saveSettings(newSettings);
    dispatch({ type: 'setSettings', payload: { newSettings }});
  }

  const setMinNumberValue = (value: number) => {
    const { settings } = gameState;
    const newSettings = { ...settings, minNumberValue: value };
    saveSettings(newSettings);
    dispatch({ type: 'setSettings', payload: { newSettings }});
  }

  const setMaxNumberValue = (value: number) => {
    const { settings } = gameState;
    const newSettings = { ...settings, maxNumberValue: value };
    saveSettings(newSettings);
    dispatch({ type: 'setSettings', payload: { newSettings }});
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
        setNumberOfCells,
        setMinNumberValue,
        setMaxNumberValue,       
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
