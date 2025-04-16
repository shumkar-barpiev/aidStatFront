export const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/[^\d+]/g, "");
  const match = digits.match(/^\+996(\d{3})(\d{2})(\d{2})(\d{2})$/);
  if (!match) return value;
  const [, code, part1, part2, part3] = match;
  return `+996 (${code}) ${part1}-${part2}-${part3}`;
};

// Получаем из "+996312625313" следующее: "+996 (312) 62-53-13"
