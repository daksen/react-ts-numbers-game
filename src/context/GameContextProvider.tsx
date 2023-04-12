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
    const initialNumbersList = getInitialNumbersList(numberOfCells);
    const initialCurrentNumber = Math.floor((Math.random() * (maxNumberValue - minNumberValue + 1)) + minNumberValue);
    dispatch({ type: 'initGame', payload: { initialCurrentNumber, initialNumbersList }});
  }

  const setIndexValue = (index: number) => {
    const { numbersList, currentNumber, settings } = gameState;
    const { numberOfCells, minNumberValue, maxNumberValue } = settings;
    const newNumbersList = replaceIndexValue(index, numbersList, currentNumber);
    const newCurrentNumber = getUniqueRandomNumber(newNumbersList, minNumberValue, maxNumberValue, numberOfCells);
    const newSelectableIndex = getSelectableIndex(newNumbersList, newCurrentNumber);
    dispatch({ type: 'setIndexValue', payload: { newCurrentNumber, newNumbersList, newSelectableIndex }});
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

  const goToSettings = () => {
    dispatch({ type: 'goToSettings' });
  }

  return (
    <GameContext.Provider 
      value={{
        gameState,
        initGame,
        setIndexValue,
        setNumberOfCells,
        setMinNumberValue,
        setMaxNumberValue,       
        goToSettings,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
