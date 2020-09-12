export const msToDate = (millisecondsSinceEpoch: number): Date => {
  return new Date(millisecondsSinceEpoch);
};

export const msToLocaleString = (millisecondsSinceEpoch: number): string => {
  return msToDate(millisecondsSinceEpoch).toLocaleDateString();
};
