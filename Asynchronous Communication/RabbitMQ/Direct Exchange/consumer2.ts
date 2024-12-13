import amqplib from "amqplib";

const consumeEmailNotification = async () => {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchangeName = "direct_notification";
    const queueName = "sms_queue";
    const bindingKey = "sms";

    await channel.assertExchange(exchangeName, "direct", { durable: true }); // durable: true means that the exchange will survive broker restarts
    await channel.assertQueue(queueName, { exclusive: true }); // used by only one connection and the queue will be deleted when that connection closes

    await channel.bindQueue(queueName, exchangeName, bindingKey);

    channel.consume(queueName, (message: amqplib.ConsumeMessage | null) => {
      if (message) {
        console.log(typeof message);
        const messageBody = JSON.parse(message.content.toString());
        console.log(`SMS notification received: ${messageBody.notification}`);
        channel.ack(message);
      } else {
        console.log("No message received");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

consumeEmailNotification();
