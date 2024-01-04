export const updateRecipes = (fetchedRecipes, selectedRecipes) => {
  return fetchedRecipes.reduce(
    (acc, recipe) => {
      const index = acc.findIndex((item) => item.id === recipe.id);

      if (index !== -1) {
        acc[index] = recipe;
      } else if (recipe.selected > 0) {
        acc.push(recipe);
      }

      return acc;
    },
    [...selectedRecipes]
  );
};
