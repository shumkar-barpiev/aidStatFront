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
