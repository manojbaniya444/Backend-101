// open close princpile implementation
// let the payment processor does not relate with the type of payment method

interface IPaymentProcessor {
  processPayment(amount: number): void;
}

class PaymentProcessorOCP {
  processor: IPaymentProcessor;

  constructor(paymentProcessor: IPaymentProcessor) {
    this.processor = paymentProcessor;
  }

  processPayment(amount: number) {
    this.processor.processPayment(amount);
  }
}

class KhaltiProcessor implements IPaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing the total ${amount} using Khalti Payment`);
  }
}

// add another processor which implement the IPaymentProcessor interface and just inject the dependency

const processPayment = new PaymentProcessorOCP(new KhaltiProcessor());
processPayment.processPayment(100);
