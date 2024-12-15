import amqplib, { Channel, ConsumeMessage } from "amqplib";
import EventEmitter from "events";

export default class RabbitMQConsumer {
  constructor(
    private channel: Channel,
    private replyQueueName: string,
    private eventEmitter: EventEmitter
  ) {}

  async consumeMessages() {
    console.log("Ready for consuming message from producer");

    this.channel.consume(
      this.replyQueueName,
      async (message: ConsumeMessage | null) => {
        if (message) {
          console.log("Message received: ", message.content.toString());
          this.eventEmitter.emit(
            message.properties.correlationId.toString(),
            message
          );
        } else {
          console.log("No message received");
        }
      },
      {
        noAck: true, // send acknowledgement after receiving the message so that message is removed after it is received here in the consumer
      }
    );
  }
}
