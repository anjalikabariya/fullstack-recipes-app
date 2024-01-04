import { totalRecipePrice } from './totalRecipePrice';

describe('calculate total price of all selected recipes', () => {
  describe('totalRecipePrice', () => {
    it('should return the calculated total price of all the combined recipes selected and quantity', () => {
      const baseRecipePrice = 1798;
      const selectedRecipes = [
        {
          id: '5f4d4acdab96be0cd6073022',
          name: 'Figgy Balsamic Pork',
          slug: 'figgy-balsamic-pork',
          headline: 'with Roasted Carrots & Thyme Potatoes',
          image:
            'https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/hellofresh_s3/image/5f4d4acdab96be0cd6073022-8b47d1f3.jpg',
          selected: 1,
          selectionLimit: 2,
          extraCharge: 0,
          yields: 2,
        },
        {
          id: '5f4d4e62e85668628873add2',
          name: 'Sweet Soy Glazed Steak Tacos',
          slug: 'sweet-soy-glazed-steak-tacos',
          headline: 'with Spicy Slaw, Marinated Cucumber & Peanuts',
          image:
            'https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/hellofresh_s3/image/sweet-soy-glazed-steak-tacos-c5c4cb4f.jpg',
          selected: 2,
          selectionLimit: 5,
          extraCharge: 0,
          yields: 2,
        },
      ];
      const price = totalRecipePrice(baseRecipePrice, selectedRecipes);
      expect(price).toBe(5394);
    });
  });
});
