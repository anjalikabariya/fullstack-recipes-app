import { calculateRecipePrice } from './calculateRecipePrice';

export const getSummary = (selectedRecipes, baseRecipePrice) => {
  let newSummary = [];
  selectedRecipes.forEach((recipe) => {
    let recipePrice = calculateRecipePrice(baseRecipePrice, recipe.extraCharge, recipe.selected);
    newSummary.push({ name: recipe.name, selected: recipe.selected, itemPrice: recipePrice });
  });
  return newSummary;
};
