import ampqlib from "amqplib";

// importing the config file
import config from "./config";

// class producer for producing
class Producer {
  channel: any;

  // create a channe;
  async createChannel() {
    const connection = await ampqlib.connect(config.rabbitMQ.url);
    this.channel = await connection.createChannel();
  }

  // after getting the message publish it to the exchange with the routing key and the message.
  async publishMessage(routingKey: string, message: string) {
    if (!this.channel) {
      await this.createChannel();
      console.log("Creating channel");
    }

    // get the exchange name from the config file
    const exchangeName = config.rabbitMQ.exchangeName;

    // create exchange which is direct exchange
    await this.channel.assertExchange(exchangeName, "direct"); // key must match the binding  key for direct exchange so that the message is routed to the correct queue

    // message to publish
    const logDetails = {
      logType: routingKey,
      message: message,
      dateTime: new Date(),
    };

    try {
      console.log("Trying to publish");
      // publish the message to the exchange
      await this.channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(JSON.stringify(logDetails))
      );
    } catch (error) {
      console.log("Error: ", error);
    }

    console.log(
      `The message is sent to exchange ${exchangeName} and the message is ${message})`
    );
  }
}

export default Producer;
