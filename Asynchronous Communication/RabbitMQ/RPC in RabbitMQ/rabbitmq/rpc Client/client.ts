import { Channel, Connection } from "amqplib";
const amqplib = require("amqplib");
import config from "../../config";

import Consumer from "./clientConsumer";
import Producer from "./clientProducer";

import { Data } from "../../types";
import { EventEmitter } from "events";

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

  // event emitter to emit event for recognizing the correct producer to receive its response
  private eventEmitter!: EventEmitter;

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
      // queue for the reply
      const q = await this.consumerChannel.assertQueue("", {
        exclusive: true,
      });
      // queue name for the replyQueue
      const replyQueueName = q.queue;

      this.eventEmitter = new EventEmitter();

      // creating a producer channel for the client
      this.producer = new Producer(
        this.producerChannel,
        replyQueueName,
        this.eventEmitter
      );
      // creating a consumer channel for the client
      this.consumer = new Consumer(
        this.consumerChannel,
        replyQueueName,
        this.eventEmitter
      );

      // consume message in the client
      this.consumer.consumeMessages();

      // set the isInitialized to true after all completed in client
      this.isInitialized = true;
    } catch (error) {
      console.log("Error connecting rabbitmq: ", error);
    }
  }

  async produce(data: Data) {
    // if produce method is called from a new server with just a new instance of client without initialize function then first initialize the connection to the rabbitmq server
    if (!this.isInitialized) {
      await this.initialize();
    }
    // produce the message which is sent from the server
    return await this.producer.produceMessage(data);
  }
}

// just get the instance of the client
// if no instance of RabbitMQClient exists then creates a new instance by calling the private constructor to get one
// if instance alrady exists one then return it
export default RabbitMQClient.getInstance();
