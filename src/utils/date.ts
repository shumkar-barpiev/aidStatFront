export function dateDifference(date1: Date, date2: Date = new Date(), by: "d" | "h" | "m" | "s" = "m") {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());

  switch (by) {
    case "d":
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    case "h":
      return Math.ceil(diffTime / (1000 * 60 * 60));
    case "m":
      return Math.ceil(diffTime / (1000 * 60));
    case "s":
    default:
      return Math.ceil(diffTime / 1000);
  }
}

export const projectFormatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const getCurrentDateTimestamp = (): string => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return `${yyyy}${mm}${dd}_${hh}${min}${ss}`;
};
