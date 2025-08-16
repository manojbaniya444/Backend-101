// Single Responsibility Principle
// But this code violate the single responsibility principle

class Product {
  id: string;
  name: string;
  price: number;

  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class Order {
  products: Product[] = [];

  addProduct(product: Product) {
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  removeProduct(productId: string) {
    this.products = this.products.filter((p) => p.id !== productId);
  }

  calculatePricing() {
    return this.products.reduce((total, product) => total + product.price, 0);
  }

  generateInvoice() {
    console.log("Order Invoice:\n");
    console.log(new Date().toDateString());
    // list the products
    this.products.forEach((product) => {
      console.log(`${product.name}\t\t${product.price}`);
    });
    console.log("---------------------------------");
    console.log(`Total Price: ${this.calculatePricing()}`);
  }

  processPayment() {
    console.log("Processing Payemt for you Order...");
    console.log("Added Order to Accounting...");
    console.log("Order Complete");
  }
}

export { Product, Order };
