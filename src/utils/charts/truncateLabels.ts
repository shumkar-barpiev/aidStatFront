export const truncateLabel = (label: string) => {
  return label.length > 22 ? label.substring(0, 22) + "..." : label;
};
