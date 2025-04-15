export const formatCurrency = (value: number | string) => {
  const number = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(number)) {
    return "";
  }
  return new Intl.NumberFormat().format(number);
};

export function formatCurrencyWithSpaces(input: string) {
  const [numberStr, currency] = input.split(" ");
  const number = parseInt(numberStr, 10);
  const formattedNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${formattedNumber} ${currency ?? ""}`;
}
