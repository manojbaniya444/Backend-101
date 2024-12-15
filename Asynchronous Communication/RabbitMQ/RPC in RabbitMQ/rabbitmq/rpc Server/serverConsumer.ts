import amqplib, { Channel, ConsumeMessage } from "amqplib";
import ProcedureHandler from "./procudure";

export default class RabbitMQConsumer {
  constructor(private channel: Channel, private rpcQueue: string) {}

  async consumeMessages() {
    console.log("Ready for consuming message from producer");

    this.channel.consume(
      this.rpcQueue,
      async (message: ConsumeMessage | null) => {
        if (!message) {
          console.log("No message received");
          return;
        }
        const { correlationId, replyTo } = message.properties;
        const operation = message.properties.headers?.function;
        console.log("Message received: ", message.content.toString());
        if (!correlationId || !replyTo) {
          console.log("Invalid message received");
          return;
        }
        // do the task that was requested to do in the
        // message and send the reply to the replyTo queue
        await ProcedureHandler.handleProcedure(
          operation,
          JSON.parse(message.content.toString()),
          correlationId,
          replyTo
        );
      },
      {
        noAck: true, // send acknowledgement after receiving the message so that message is removed after it is received here in the consumer
      }
    );
  }
}
