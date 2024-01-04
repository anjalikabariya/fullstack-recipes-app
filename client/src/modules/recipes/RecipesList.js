import React from 'react';

import { Row, Col } from '../../components/Grid';
import Flex from '../../components/Flex';
import Box from '../../components/Box';
import RecipeCard from './RecipeCard';
import PriceInfo from './PriceInfo';
import useFetchHelloFreshBox from '../../hooks/useFetchHelloFreshBox';
import { parseRawPrice } from './price';
import { updateRecipes } from '../../utils/updateRecipes';
import { getSummary } from '../../utils/getSummary';
import { totalRecipePrice } from '../../utils/totalRecipePrice';

const Recipes = () => {
  const [page, setPage] = React.useState(1); // default page set to 1 and incremented on scroll
  const [maxAllowedRecipes, setMaxAllowedRecipes] = React.useState(0); // maximum allowed recipes of product
  const [minRequiredRecipes, setMinRequiredRecipes] = React.useState(0); // minimum required recipes of product
  const { recipes, fetchedProduct, loading, hasMore } = useFetchHelloFreshBox(page); // this hook will be called when page is updated to fetch data
  let [product, setProduct] = React.useState({}); // product for which recipes are displayed
  let [selectedRecipes, setSelectedRecipes] = React.useState([]); // array of recipes selected
  let [totalSelectedRecipes, setTotalSelectedRecipes] = React.useState(0); // total number of recipes selected
  let [totalBill, setTotalBill] = React.useState(0); // total Bill of recipes selected
  let [summary, setSummary] = React.useState({ items: [], shippingPrice: 0 }); // price summary data for tooltip. This includes shippingPrice for product.

  // intersection observer to fetch recipes on scrolling page
  const observer = React.useRef();
  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && hasMore) { // check for intersection and if there's more data, update page
      setPage((prevPage) => prevPage + 1);
    }
  };

  React.useEffect(() => {
    if (loading) return;

    observer.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });

    if (observer.current) {
      observer.current.observe(document.querySelector('.scroll-trigger')); // scroll-trigger will remain at bottom of the page
    }

    return () => { // cleanup on unmount
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading]);

  // add recipe
  const handleAddRecipe = (recipeId) => {
    const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);
    if ( // check if selection limit is reached for product or recipe
      (selectedRecipe.selected < selectedRecipe.selectionLimit ||
        selectedRecipe.selectionLimit === null) &&
      totalSelectedRecipes < maxAllowedRecipes
    ) {
      selectedRecipe.selected += 1; // update 'selected' value of recipe
      setTotalSelectedRecipes((totalSelectedRecipes += 1)); // update total selected recipes
    }
  };

  // remove recipe
  const handleRemoveRecipe = (recipeId) => {
    const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);
    // check if at least 1 recipe is selected
    if (selectedRecipe.selected > 0) {
      selectedRecipe.selected -= 1;
      setTotalSelectedRecipes((totalSelectedRecipes -= 1));
    }
  };

  // min/max recipe boundaries
  let minRecipesSelected = totalSelectedRecipes >= minRequiredRecipes;
  let maxRecipesSelected = totalSelectedRecipes === maxAllowedRecipes;

  React.useEffect(() => {
    if (// check if it's different product, update values & selection related to product
      Object.keys(fetchedProduct).length > 0 &&
      fetchedProduct.productName !== product.productName
    ) {
      setProduct(fetchedProduct);
      setMaxAllowedRecipes(fetchedProduct.max);
      setMinRequiredRecipes(fetchedProduct.min);
      setSummary({ items: [], shippingPrice: fetchedProduct.shippingPrice });
      if (fetchedProduct.selectedRecipes.length > 0) { // if there are any default selected recipes, add them to component state
        setSelectedRecipes(fetchedProduct.selectedRecipes);
        setTotalSelectedRecipes(fetchedProduct.selectedRecipes.length);
      }
    }
  }, [fetchedProduct]); // to be called when product is fetched

  React.useEffect(() => {
    let recipePrice = totalRecipePrice(product.baseRecipePrice, selectedRecipes); // update total price of all recipes selected
    setTotalBill(parseRawPrice(recipePrice + (recipePrice > 0 && product.shippingPrice))); // update total Bill including shipping price
    let updatedSummary = getSummary(selectedRecipes, product.baseRecipePrice); 
    setSummary({ items: updatedSummary, shippingPrice: product.shippingPrice }); // update price summary as per selection
  }, [selectedRecipes]); // to be called when recipes is selected or unselected

  React.useEffect(() => {
    let updatedList = updateRecipes(recipes, selectedRecipes);
    setSelectedRecipes(updatedList); // update array of selected recipes
  }, [totalSelectedRecipes, recipes]); // to be called when recipes are updated or total selection is updated

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Row>
        <Col sm={6}>
          <h3>{product.headline}</h3>
        </Col>
        <Col sm={6}>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box textAlign="right" mr="xs">
              <h3>{totalBill}</h3>
            </Box>
            <PriceInfo summary={summary} totalBill={totalBill} />
          </Flex>
        </Col>
      </Row>

      <Row>
        {recipes &&
          recipes.map((recipe) => (
            <Col sm={12} md={6} xl={4} key={recipe.id}>
              <Box mb="md">
                <RecipeCard
                  {...recipe}
                  handleAddRecipe={() => handleAddRecipe(recipe.id)}
                  handleRemoveRecipe={() => handleRemoveRecipe(recipe.id)}
                  minRecipesSelected={minRecipesSelected}
                  maxRecipesSelected={maxRecipesSelected}
                />
              </Box>
            </Col>
          ))}
      </Row>
      <div className="scroll-trigger" />
    </>
  );
};

export default Recipes;
