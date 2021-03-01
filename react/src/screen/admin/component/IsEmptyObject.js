export const IsEmptyObject = object =>
  !Object.getOwnPropertySymbols(object).length &&
  !Object.getOwnPropertyNames(object).length;
