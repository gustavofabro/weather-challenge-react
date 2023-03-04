function maskDateToMonthDay(date: Date): string {
  return new Date(date).toLocaleDateString([], {
    day: 'numeric',
    month: 'numeric',
    weekday: 'short'
  });
}

function maskDateToHourMinute(date: Date): string {
  return new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function isSameDate(date1: Date, date2: Date): boolean {
  return new Date(date1.toDateString()).valueOf() === new Date(date2.toDateString()).valueOf();
}

export { maskDateToMonthDay, maskDateToHourMinute, isSameDate };
