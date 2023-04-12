import { GameState, NullableNumberType, SelectabeIndexType, SettingsType } from "../interfaces/interfaces";

type GameAction =
  | { type: 'initGame', payload: { initialCurrentNumber: number, initialNumbersList: NullableNumberType[] }}
  | { type: 'restartGame', payload: { initialCurrentNumber: number, initialNumbersList: NullableNumberType[] }}
  | { type: 'setIndexValue', payload: { newCurrentNumber: number, newNumbersList: NullableNumberType[], newSelectableIndex: SelectabeIndexType }}
  | { type: 'setSettings', payload: { newSettings: SettingsType }}
  | { type: 'goToSettings' }

const gameReducer = (state: GameState, action: GameAction) => {
  switch (action.type) {
    case 'initGame':
      return {
        ...state,
        initialized: true,
        selectableIndex: { minor: -1, major: -1 },
        currentNumber: action.payload.initialCurrentNumber,
        numbersList: action.payload.initialNumbersList,
      };
    case 'restartGame':
      return {
        ...state,
        selectableIndex: { minor: -1, major: -1 },
        currentNumber: action.payload.initialCurrentNumber,
        numbersList: action.payload.initialNumbersList,
      };
    case 'setIndexValue':
      return { 
        ...state,
        currentNumber: action.payload.newCurrentNumber,
        numbersList: action.payload.newNumbersList,
        selectableIndex: action.payload.newSelectableIndex,
      }
    case 'setSettings':
      return { 
        ...state,
        settings: action.payload.newSettings,
      }
    case 'goToSettings':
      return {
        ...state,
        initialized: false,
        currentNumber: null,
        numbersList: [],
        selectableIndex: null,
        successProbability: null,
      };
    default:
      throw new Error('No valid action type.');
  }
}

export default gameReducer;
