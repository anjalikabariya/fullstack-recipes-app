const fs = require('fs');
const app = require('./index.js'); // Replace with the actual path
const { getRecipes, updateRecipe } = require('./recipe.services.js');
const { expect } = require('chai');

describe('GET recipes unit test function', () => {
  it('should return product details for a specific product', async () => {
    const product = {
      id: '5f4e821d531e677602591a9b',
      productName: 'Classic Box',
      headline: 'WEEK OF OCTOBER 12TH',
      min: 3,
      max: 8,
      baseRecipePrice: 1798,
      shippingPrice: 1298,
    };
    const length = 6;
    const {
      recipes: returnedRecipes,
      product: returnedProduct,
      hasMore: returnedHasMore,
    } = await getRecipes('Classic Box', 1);
    expect(returnedHasMore).to.be.true;
    expect(returnedRecipes.length).to.equal(length);
    expect(returnedProduct.id).to.equal(product.id);
    expect(returnedProduct.name).to.equal(product.name);
  });

  it('should return error message if product not found', async () => {
    await getRecipes('falsy product', 1).catch((err) => {
      expect(err.message).to.equal('invalid product name');
    });
  });
});

describe('PATCH /recipe/:recipeId', () => {
  it('should update a recipe', async () => {
    const recipeId = '5f4d4a7e62fb0224951e7ec4';
    const update = { headline: 'new headline updated' };
    const recipe = {
      "id": "5f4d4a7e62fb0224951e7ec4",
      "name": "Chicken Sausage & Spinach Ravioli",
      "slug": "chicken-sausage-spinach-ravioli",
      "headline": "new headline updated",
      "image": "https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/hellofresh_s3/image/5f4d4a7e62fb0224951e7ec4-2fe03fc2.jpg",
      "selected": 1,
      "selectionLimit": 1,
      "extraCharge": 0,
      "yields": 2
    }
    const recipeToUpdate = await updateRecipe(recipeId, update);
    expect(JSON.stringify(recipeToUpdate)).to.equal(JSON.stringify(recipe));
  });

  it('should return error message for invalid recipe id', async () => {
    await updateRecipe(123123, {"headline": "updated headline"}).catch((err) => {
      expect(err.message).to.equal('invalid recipe');
    });
  });
});
