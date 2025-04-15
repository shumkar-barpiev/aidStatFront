export const formatCurrency = (value: number | string) => {
  const number = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(number)) {
    return "";
  }

  if (number >= 1_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + " млрд";
  }
  if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1) + " млн";
  }
  return number.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export function formatCurrencyWithSpaces(input: string) {
  const [numberStr, currency] = input.split(" ");
  const number = parseInt(numberStr, 10);
  const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formattedNumber} ${currency ?? ""}`;
}
