function daysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

export default function dateGenerator(monthIndex: number) {
  const date = new Date(new Date().getFullYear(), monthIndex, 0);

  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    daysInMonth(date.getMonth() + 1, date.getFullYear())
  );

  return [firstDay, lastDay];
}
