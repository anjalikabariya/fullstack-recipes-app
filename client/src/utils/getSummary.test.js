import { getSummary } from './getSummary';

describe('get Summary of selected recipes', () => {
  describe('getSummary', () => {
    it('should return the array of selected recipes which includes recipe name, selection quantity & total recipe price', () => {
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
      const baseRecipePrice = 1798;
      const summary = getSummary(selectedRecipes, baseRecipePrice);
      expect(summary.length).toBe(2);
      expect(summary[0].name).toBe('Figgy Balsamic Pork');
      expect(summary[0].selected).toBe(1);
      expect(summary[0].itemPrice).toBe(1798);
      expect(summary[1].name).toBe('Sweet Soy Glazed Steak Tacos');
      expect(summary[1].selected).toBe(2);
      expect(summary[1].itemPrice).toBe(3596);
    });
  });
});
