type PaymentType = "khalti" | "prabhu" | "esewa";

class PaymentProcessor {
  processPayment(amount: number, paymentType: PaymentType) {
    switch (paymentType) {
      case "khalti":
        console.log(
          `Processing payment of ${amount} using ${paymentType} method.`
        );
        break;

      case "prabhu":
        console.log(
          `Processing payment of ${amount} using ${paymentType} method.`
        );
        break;

      case "esewa":
        console.log(
          `Processing payment of ${amount} using ${paymentType} method.`
        );
        break;

      // add more payment type if we want to add more payment.
      // but violate the open close principle here because here we are modifying the payment processor method
      // look at ocp.ts for the open close method

      default:
        break;
    }
  }
}

const processor = new PaymentProcessor();

processor.processPayment(100, "esewa");
