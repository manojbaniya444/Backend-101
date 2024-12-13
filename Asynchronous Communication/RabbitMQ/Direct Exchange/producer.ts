import amqplib from "amqplib";

type Message = {
  notification: string;
  user: string;
};

const publishDirectMessage = async (routingKey: string, message: Message) => {
  try {
    const connection = await amqplib.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const exchangeName = "direct_notification";

    await channel.assertExchange(exchangeName, "direct", { durable: true }); // durable: true means that the exchange will survive broker restarts

    channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(message)),
      { persistent: true } // the message will be saved to disk
    );

    setTimeout(() => {
      connection.close();
    }, 400);

    console.log(`Message sent to routing key ${routingKey}`);
  } catch (error) {
    console.error(error);
  }
};

publishDirectMessage("email", {
  notification: "Hi you are welcome to our platform",
  user: "user1",
});
publishDirectMessage("sms", {
  notification: "Welcome to the platform dear user",
  user: "user2",
});
