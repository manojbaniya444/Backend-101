import { Channel } from "amqplib";
import config from "../../config";
import { randomUUID } from "crypto";
import { Data } from "../../types";
import EventEmitter from "events";

export default class RabbitMQProducer {
  // constructor
  constructor(
    private channel: Channel,
    private replyQueueName: string,
    private eventEmitter: EventEmitter
  ) {}

  // produceMessage
  async produceMessage(message: Data) {
    const uuid = randomUUID();

    this.channel.sendToQueue(
      // sending to the rpcQueue queue from client producer
      config.rabbitMQ.queues.rpcQueue,
      // message Buffer
      Buffer.from(JSON.stringify(message)),
      // message properties
      {
        replyTo: this.replyQueueName,
        correlationId: uuid,
        headers: {
          function: message.operation,
        },
      }
    );

    return new Promise((resolve) => {
      this.eventEmitter.once(uuid, (message) => {
        const reply = JSON.parse(message.content.toString());
        resolve(reply);
      });
    });
  }
}
