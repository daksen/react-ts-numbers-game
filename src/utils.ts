import { NullableNumberType, SelectabeIndexType } from "./interfaces/interfaces";

export const getUniqueRandomNumber = (
  numbersList: NullableNumberType[],
  minNumber: number, 
  maxNumber: number,
) => {
  let n: number;
  do {
    n = Math.floor((Math.random() * maxNumber) + minNumber);
  } while (numbersList.includes(n));
  return n;
}

export const getInitialNumbersList = (
  numbersCount: number,
) => {
  return Array(numbersCount).fill(null);
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
  if (index < (length / 2)) {
    return 'left';
  }
  return 'right';
}
