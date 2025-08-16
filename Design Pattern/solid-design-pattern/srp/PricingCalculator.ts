import { Product } from "./Order";

class PricingCalculator {
  calculatePricing(products: Product[]) {
    return products.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }
}

export { PricingCalculator };
