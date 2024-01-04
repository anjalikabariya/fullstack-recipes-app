import { updateRecipes } from './updateRecipes';

describe('update selected recipes by combining new fetched recipes or adding new selection', () => {
  describe('updateRecipes', () => {
    it('should update the array of selected recipes which includes fetched recipes and no duplicates', () => {
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
      const fetchedRecipes = [{
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
      }, {
        id: '5f4d4acdab96be0cd6073022',
        name: 'Figgy Balsamic Pork',
        slug: 'figgy-balsamic-pork',
        headline: 'with Roasted Carrots & Thyme Potatoes',
        image:
          'https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/hellofresh_s3/image/5f4d4acdab96be0cd6073022-8b47d1f3.jpg',
        selected: 2,
        selectionLimit: 2,
        extraCharge: 0,
        yields: 2,
      }, {
        id:'5f4e82c04094d36cbf05dd61',
        name: 'Pork Sausage & Roasted Pepper Pasta',
        slug: 'pork-sausage-roasted-pepper-pasta',
        headline: 'with Creamy Parmesan Garlic Tomato Sauce',
        image: 'https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/hellofresh_s3/image/5f4e82c04094d36cbf05dd61-9cb62953.jpg',
        selected: 1,
        selectionLimit: null,
        extraCharge: 0,
        yields: 2
      }]
      let updatedList = selectedRecipes
      expect(updatedList.find(item => item.id==='5f4d4acdab96be0cd6073022').selected).toBe(1)
      expect(updatedList.find(item => item.id==='5f4e82c04094d36cbf05dd61')).toBe(undefined)
      expect(updatedList.find(item => item.id==='5f4d4e62e85668628873add2').selected).toBe(2)
      updatedList = updateRecipes(fetchedRecipes,selectedRecipes);
      expect(updatedList.length).toBe(3)
      expect(updatedList.find(item => item.id==='5f4d4acdab96be0cd6073022').selected).toBe(2)
      expect(updatedList.find(item => item.id==='5f4e82c04094d36cbf05dd61').selected).toBe(1)
      expect(updatedList.find(item => item.id==='5f4d4e62e85668628873add2').selected).toBe(2)
    });
  });
});
