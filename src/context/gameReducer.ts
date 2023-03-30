import { GameState, NullableNumberType, SelectabeIndexType } from "../interfaces/interfaces";

type GameAction =
  | { type: 'initGame', payload: { newCurrentNumber: number, initialNumbersList: NullableNumberType[] }}
  | { type: 'setSelectableIndex', payload: { newSelectableIndex: SelectabeIndexType }}
  | { type: 'setIndexValue', payload: { newCurrentNumber: number, newNumbersList: NullableNumberType[] }}

const gameReducer = (state: GameState, action: GameAction) => {
  switch (action.type) {
    case 'initGame':
      return {
        ...state,
        initialized: true,
        currentNumber: action.payload.newCurrentNumber,
        numbersList: action.payload.initialNumbersList,
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
