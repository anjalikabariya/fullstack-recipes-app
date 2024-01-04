let products = require('./products.json');
const fs = require('fs');

// @request: service to return the details & recipes list of a specific product.
// @param: name => Name of product for which details are to be returned. Defaults to `Classic Box`
// @param: page => page number for which recipe details are to be returned.
// @returnType: {recipes: Array, product: Object, hasMore: boolean}: Object
// @return: requested product details
const getRecipes = async (name='Classic Box', page) => {
  const limit = 6; // default limit set
  let product, filteredRecipes;
  product = await Object.values(products).find((product) => {return product.productName === name}); // find product by name, if param not passed, use default product name
  if(product === undefined) throw new Error('invalid product name') //throw error for invalid product name
  filteredRecipes = product.recipes; // recipes of selected product
  const { paginatedRecipes, hasMore } = paginate(page, limit, filteredRecipes); // apply pagination
  const picked = (({ id, productName, min, max, shippingPrice, baseRecipePrice, headline }) => ({
    id,
    productName,
    min,
    max,
    shippingPrice,
    baseRecipePrice,
    headline,
  }))(product); // pick product details. Recipes list is omitted as it's not needed.
  const selectedRecipes = filteredRecipes.filter((recipe) => recipe.selected > 0); // find recipes which are selected by default in product
  picked['selectedRecipes'] = selectedRecipes; // send them with other product details
  return { recipes: paginatedRecipes, product: picked, hasMore: hasMore };
};


// @request: service to mutate details of recipe
// @param: recipeId => Id of recipe to modify details
// @param: update => object containing property name and value to be updated in original recipe
// @returnType: {recipe details}: Object
// @return: updated recipe details
const updateRecipe = async (recipeId, update) => {
  let recipeIndex, productIndex;
  products.forEach(product => { 
    let j = product.recipes.findIndex((recipe) => recipeId === recipe.id); // from list of products and it's recipes, find index to be updated
    if (j !== -1) {
      productIndex = products.indexOf(product);
      recipeIndex = j;
    }
  })
  try { // if index is found, get the recipe and update it's values accordingly
    let recipeToUpdate = products[productIndex].recipes[recipeIndex];
    Object.assign(recipeToUpdate, update);
    const data = JSON.stringify(products);
    await fs.writeFile('backend/products.json', data, () => console.log('updated recipe')); // update in json data file
    return recipeToUpdate
  } catch (e) {
    throw new Error('invalid recipe') // if index not found, catch error
  }
};

// @description: returns recipe list based on page number
// @param: page => page number for which recipes should be returned
// @param: limit => limit for how many recipes should be returned per page
// @param: recipes => array of all recipes which are to be paginated
// @returnType: { paginatedRecipes: Array, hasMore: boolean }: Object
// @return: array of paginated recipes and boolean value mentioning if there are more recipes
const paginate = (page, limit, recipes) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedRecipes = recipes.slice(startIndex, endIndex);
  const hasMore = recipes.length > endIndex;
  return { paginatedRecipes: paginatedRecipes, hasMore: hasMore };
};

module.exports = { updateRecipe, getRecipes };
