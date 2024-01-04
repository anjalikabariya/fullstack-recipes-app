import { calculateRecipePrice } from './calculateRecipePrice';

export const totalRecipePrice = (baseRecipePrice, selectedRecipes) => {
  let total = 0;
  selectedRecipes.forEach((recipe) => {
    total += calculateRecipePrice(baseRecipePrice, recipe.extraCharge, recipe.selected);
  });
  return parseInt(total);
};
