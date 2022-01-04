export function getNumberOfDaysInMonth(year: number): number[] {
  return [31, year % 4 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}

export const weekDays = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
