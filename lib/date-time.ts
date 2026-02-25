export function dateToISOString(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export function dateISOAddDay(date: string, day: number) {
  const dateCopy = new Date(date);
  dateCopy.setDate(dateCopy.getDate() + day);

  return dateCopy;
}
