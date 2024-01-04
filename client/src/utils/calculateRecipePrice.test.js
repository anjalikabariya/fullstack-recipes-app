import { calculateRecipePrice } from './calculateRecipePrice';

describe('calculate individual recipe price', () => {
  describe('calculateRecipePrice', () => {
    it("should return the calculated recipe price based on it's extra charges and quantity of selection ", () => {
      const basePrice = 1798;
      const selected = 2;
      const extraCharges = 239
      const price = calculateRecipePrice(basePrice, extraCharges, selected);
      expect(price).toBe(4074);
    });
  });
});