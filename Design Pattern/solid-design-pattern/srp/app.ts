// Single Responsibiliy Principle Does not follow
// Everything in order class which has all get product, add product, process payment, invoice generator etc.
// so look at appsrp.ts for srp follow code

import { Product, Order } from "./Order";

const product1 = new Product("prod1", "Test Product", 100);

const product2 = new Product("prod2", "ProductAnother", 1000);

const order = new Order();

order.addProduct(product1);
order.addProduct(product2);

order.generateInvoice();
order.processPayment();
