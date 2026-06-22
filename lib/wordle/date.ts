export function getLocalDateKey(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getDisplayDate(date = new Date()): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function getDayOffset(dateKey: string): number {
  const [year, month, day] = dateKey.split("-").map(Number);
  const value = Date.UTC(year, month - 1, day);
  const origin = Date.UTC(2026, 0, 1);

  return Math.max(0, Math.floor((value - origin) / 86_400_000));
}
