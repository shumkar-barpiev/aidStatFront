export const formatCurrency = (value: number | string) => {
  const number = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(number)) {
    return "";
  }
  return new Intl.NumberFormat().format(number);
};
