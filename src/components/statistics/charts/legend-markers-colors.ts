export const getColorById = (id: number) => {
  const coldPalette = ["#5e99fcfc", "#54afe3e3", "#69ebfafb", "#54e3cae3", "#9e9e9e"];
  return coldPalette[id % coldPalette.length];
};
