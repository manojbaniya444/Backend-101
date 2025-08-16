class Product {
  id: string;
  name: string;
  price: number;

  constructor(id: string, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

class OrderSrp {
  products: Product[] = [];

  getProducts() {
    return this.products;
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  removeProduct(productId: string) {
    this.products = this.products.filter((p) => p.id !== productId);
  }
}

export { OrderSrp, Product };
