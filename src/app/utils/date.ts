
// Function to get the week number
export function getWeekNumber(date: Date): number {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.valueOf() - startDate.valueOf()) / (1000 * 60 * 60 * 24));
  return Math.ceil((days + startDate.getDay() + 1) / 7);
}
