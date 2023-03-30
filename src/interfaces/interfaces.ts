export type NullableNumberType = number | null;

export type SelectabeIndexType = { minor: number, major: number } | null;

export type SettingsType = {
  numbersCount: number,
  minNumber: number,
  maxNumber: number,
}

export interface GameState {
  initialized: boolean;
  numbersList: NullableNumberType[];
  selectableIndex: SelectabeIndexType;
  successProbability: NullableNumberType;
  currentNumber: number | null;
  settings: SettingsType;
}
