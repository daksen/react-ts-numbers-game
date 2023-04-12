import { NullableNumberType, SelectabeIndexType, SettingsType } from "./interfaces/interfaces";

export const getUniqueRandomNumber = (
  numbersList: NullableNumberType[],
  minNumberValue: number, 
  maxNumberValue: number,
  numberOfCells: number,
) => {
  let n: number;
  const numbersRange = maxNumberValue - minNumberValue + 1;
  do {
    n = Math.floor((Math.random() * numbersRange) + minNumberValue);
  } while (numberOfCells <= numbersRange && numbersList.includes(n));
  return n;
}

export const getInitialNumbersList = (numberOfCells: number) => {
  return Array(numberOfCells).fill(null);
}

export const getSelectableIndex = (
  numbersList: NullableNumberType[],
  currentNumber: NullableNumberType,
) => {
  const greaterNumber = (n: NullableNumberType) => n && currentNumber && n > currentNumber;
  const lowerNumber = (n: NullableNumberType) => n && currentNumber && n < currentNumber;
  return {
    minor: numbersList.findLastIndex(lowerNumber),
    major: numbersList.findIndex(greaterNumber),
  }
}

export const getIsSelectable = (
  index: number, 
  selectableIndex: SelectabeIndexType
) => {
  return Boolean(
    selectableIndex &&
    (selectableIndex.minor === -1 || index > selectableIndex.minor) &&
    (selectableIndex.major === -1 || index < selectableIndex.major)
  );
}

export const replaceIndexValue = (
  index: number, 
  numbersList: NullableNumberType[],
  currentNumber: NullableNumberType,
) => {
  const newNumbersList: NullableNumberType[] = [...numbersList];
  newNumbersList[index] = currentNumber;
  return newNumbersList;
}

export const getColumn = (
  index: number,
  length: number,
) => {
  return index < (length / 2) ? 'card-left' : 'card-right';
}

export const saveSettings = (settings: SettingsType) => {
  localStorage.setItem('settings', JSON.stringify(settings));
}
