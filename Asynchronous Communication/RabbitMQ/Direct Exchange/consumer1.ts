import amqplib from "amqplib";

type Message = {
  notification: string;
  user: string;
};

const consumeEmailNotification = async () => {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchangeName = "direct_notification";
    const queueName = "email_queue";
    const bindingKey = "email";

    await channel.assertExchange(exchangeName, "direct", { durable: true });
    await channel.assertQueue(queueName, { exclusive: true });

    await channel.bindQueue(queueName, exchangeName, bindingKey);

    channel.consume(queueName, (message: any) => {
      if (message) {
        console.log(typeof message);
        const messageBody = JSON.parse(message.content.toString());
        console.log(`Email notification received: ${messageBody.notification}`);
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
