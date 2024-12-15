import { Channel, Connection } from "amqplib";
const amqplib = require("amqplib");
import config from "../../config";

import Consumer from "./serverConsumer";
import Producer from "./serverProducer";

class RabbitMQClient {
  // The constructor is private which prevents instatation of this class from outside
  // This enforces the singleton pattern ensuring only one instance of RabbitMQClient is created
  private constructor() {}

  // a static variable to hold the single instance of the RabbitMQClient class
  // This is accessed and set via the getInstance() function
  private static instance: RabbitMQClient;
  // Tracks if the instance is initialized or not
  // This prevents redundant initialization if initialize() is called multiple times
  private isInitialized = false;

  // Deffered Initialization Variables
  // ! means that the variable will be initialized later avoiding compiler errors during initialization
  private producer!: Producer;
  private consumer!: Consumer;
  private connection!: Connection;
  private producerChannel!: Channel;
  private consumerChannel!: Channel;

  // to get the single instance
  public static getInstance() {
    if (!this.instance) {
      this.instance = new RabbitMQClient();
    }
    return this.instance;
  }

  // this initialize the producer, consumer channel and connection to the rabbitmq server along with the queue required everything to the client
  async initialize() {
    // just return if the instance is already initialized
    if (this.isInitialized) {
      return;
    }
    try {
      // connection to the rabbitmq
      this.connection = await amqplib.connect(config.rabbitMQ.uri);

      // producer channel
      this.producerChannel = await this.connection.createChannel();
      // consumer channel
      this.consumerChannel = await this.connection.createChannel();
      // queue for the reply rpcQueue = q.queue
      const { queue: rpcQueue } = await this.consumerChannel.assertQueue(
        config.rabbitMQ.queues.rpcQueue,
        {
          exclusive: true,
        }
      );

      // creating a producer channel for the client
      this.producer = new Producer(this.producerChannel);
      // creating a consumer channel for the client
      this.consumer = new Consumer(this.consumerChannel, rpcQueue);

      // consume message in the client
      this.consumer.consumeMessages();

      // set the isInitialized to true after all completed in client
      this.isInitialized = true;
    } catch (error) {
      console.log("Error connecting rabbitmq: ", error);
    }
  }

  async produce(data: any, correlationId: string, replyToQueue: string) {
    // if produce method is called from a new server with just a new instance of client without initialize function then first initialize the connection to the rabbitmq server
    if (!this.isInitialized) {
      await this.initialize();
    }
    // produce the message which is sent from the server
    return await this.producer.produceMessage(
      data,
      correlationId,
      replyToQueue
    );
  }
}

// just get the instance of the client
// if no instance of RabbitMQClient exists then creates a new instance by calling the private constructor to get one
// if instance alrady exists one then return it
export default RabbitMQClient.getInstance();
