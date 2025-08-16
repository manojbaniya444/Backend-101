import { Product } from "./Order";

class Invoice {
  generateInvoice(total: number, products: Product[]) {
    console.log(`
Date of Invoice for Order: ${new Date().toDateString()}
----------------------------------------------------------
Product Name\t\tPrice
-----------------------------------------------------------
            `);
    products.forEach((product) => {
      console.log(`${product.name}\t\t${product.price}`);
    });
    console.log(`Total: ${total}`);
  }
}

export { Invoice };
