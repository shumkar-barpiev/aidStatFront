export const getColorById = (id: number) => {
  const coldPalette = ["#003366", "#4B0082", "#333333", "#4A6D7C", "#1A1A5C"];
  return coldPalette[id % coldPalette.length];
};
