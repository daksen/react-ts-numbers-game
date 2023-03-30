import { GameState, NullableNumberType, SelectabeIndexType } from "../interfaces/interfaces";

type GameAction =
  | { type: 'initGame', payload: { initialCurrentNumber: number, initialNumbersList: NullableNumberType[] }}
  | { type: 'restartGame', payload: { initialCurrentNumber: number, initialNumbersList: NullableNumberType[] }}
  | { type: 'gameSttings' }
  | { type: 'setSelectableIndex', payload: { newSelectableIndex: SelectabeIndexType }}
  | { type: 'setIndexValue', payload: { newCurrentNumber: number, newNumbersList: NullableNumberType[] }}

const gameReducer = (state: GameState, action: GameAction) => {
  switch (action.type) {
    case 'initGame':
      return {
        ...state,
        initialized: true,
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
    case 'gameSttings':
      return {
        ...state,
        initialized: false,
        currentNumber: null,
        numbersList: [],
        selectableIndex: null,
        successProbability: null,
      };
    case 'setSelectableIndex':
      return {
        ...state,
        selectableIndex: action.payload.newSelectableIndex,
      }
    case 'setIndexValue':
      return { 
        ...state,
        selectableIndex: null,
        currentNumber: action.payload.newCurrentNumber,
        numbersList: action.payload.newNumbersList,
      }
    default:
      throw new Error('No valid action type.');
  }
}

export default gameReducer;
