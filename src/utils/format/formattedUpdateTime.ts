export const formattedUpdateTime = (date: string | undefined | null, defaultDate: string) => {
  if (!date) return defaultDate;
  const newDate = new Date(date);
  return newDate.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
