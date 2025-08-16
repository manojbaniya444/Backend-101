import { Invoice } from "./Invoice";
import { Product, OrderSrp } from "./OrderSrp";
import { Payment } from "./Payment";
import { PricingCalculator } from "./PricingCalculator";

const product1 = new Product("prod1", "product1", 100);
const product2 = new Product("prod2", "product2", 1000);

const order = new OrderSrp();
order.addProduct(product1);
order.addProduct(product2);

const invoice = new Invoice();
const pricingcalculator = new PricingCalculator();
invoice.generateInvoice(
  pricingcalculator.calculatePricing(order.getProducts()),
  order.getProducts()
);

const payment = new Payment();
payment.processPayment(order);
