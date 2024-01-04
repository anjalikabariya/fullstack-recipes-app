const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const { updateRecipe, getRecipes } = require('./recipe.services');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// @request: GET request to return the details of a specific product
// @param: name => Name of product for which details are to be returned
// @param: page => page number for which recipe details are to be returned. Defaults to 1
// @returnType: {recipes: Array, product: Object, hasMore: boolean}: Object
// @return: requested product details
app.get('/recipes', async (req, res) => {
  try {
    const name = req.query.productName;
    const page = parseInt(req.query.page) || 1;
    const { recipes, product, hasMore } = await getRecipes(name, page);
    res.status(200).json({
      message: 'Fetched Successfully',
      recipes: recipes,
      product: product,
      hasMore: hasMore,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// @request: PATCH request to mutate details of recipe
// @param: recipeId => Id of recipe to modify details
// @param: body => object containing property name and value to be updated in original recipe
// @returnType: {recipe details}: Object
// @return: updated recipe details
app.patch('/recipe/:recipeId', async(req, res, next) => {
  try {
    const recipeId = req.params.recipeId;
    const update = req.body;
    let recipeToUpdate = await updateRecipe(recipeId, update);
    res.status(200).json(recipeToUpdate);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
