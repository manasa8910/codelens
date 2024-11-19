// utils/formatValue.js
export const formatValue = (num) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k"; // Convert to "k" format with one decimal
  }
  return num; // Return the original number if less than 1000
};
