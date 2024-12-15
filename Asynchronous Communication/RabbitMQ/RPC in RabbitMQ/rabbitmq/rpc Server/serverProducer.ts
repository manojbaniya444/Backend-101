import { Channel } from "amqplib";

export default class RabbitMQProducer {
  // constructor
  constructor(private channel: Channel) {}

  // produceMessage
  async produceMessage(
    message: any,
    correlationId: string,
    replyToQueue: string
  ) {
    // sending to the reply queue after the task is completed by the rpc server
    this.channel.sendToQueue(
      replyToQueue,
      Buffer.from(JSON.stringify(message)),
      {
        correlationId,
      }
    );
  }
}
