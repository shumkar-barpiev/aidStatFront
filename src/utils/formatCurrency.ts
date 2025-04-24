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

export function formatCurrencyWithSpaces(input?: string | null, extraInput?: string | null): string {
  if (!input) return "0";

  const [numberStr, currency] = input.split(" ");
  const mainNumber = parseInt(numberStr, 10);

  let extraNumber = 0;
  if (extraInput) {
    const [extraNumberStr] = extraInput.split(" ");
    extraNumber = parseInt(extraNumberStr, 10);
  }

  const total = mainNumber + extraNumber;
  const formattedInt = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return `${formattedInt}${currency ? ` ${currency}` : ""}`;
}
