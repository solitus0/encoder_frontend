export function formatReadableDate(dateStr: string): string {
  const dateObj = new Date(dateStr);

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(dateObj);
}
