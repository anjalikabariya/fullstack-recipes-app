export const calculateRecipePrice = (baseRecipePrice, extraCharge, selected) => {
  return (baseRecipePrice + extraCharge) * selected;
};
