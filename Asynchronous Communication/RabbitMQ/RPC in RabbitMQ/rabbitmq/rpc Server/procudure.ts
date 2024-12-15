import rabbitClient from "./server";

export default class ProcedureHandler {
  static async handleProcedure(
    operation: string,
    data: any,
    correlationId: string,
    replyTo: string
  ) {
    let response = {};

    const { num1, num2 } = data;

    console.log(`Received operation: ${operation}`);

    switch (operation) {
      case "add":
        response = { result: num1 + num2 };
        break;
      case "subtract":
        response = { result: num1 - num2 };
        break;
      case "multiply":
        response = { result: num1 * num2 };
        break;
      case "divide":
        response = { result: num1 / num2 };
        break;
      default:
        response = { error: "Invalid operation" };
    }

    // send response
    await rabbitClient.produce(response, correlationId, replyTo);
  }
}
