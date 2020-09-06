export function msToDate(millisecondsSinceEpoch: number): Date {
  return new Date(millisecondsSinceEpoch);
}

export function msToLocaleString(millisecondsSinceEpoch: number): string {
  return msToDate(millisecondsSinceEpoch).toLocaleDateString();
}
