import amqplib from "amqplib";

// message type that we are getting from the producer
type Message = {
  logType: string;
  message: string;
  dateTime: Date;
};

async function consumeMessages() {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();

  // exchange name as defined in producer
  const exchangeName = "logExchange"; // should be same

  // queue
  const q = await channel.assertQueue("InfoQueue");

  // binding
  await channel.bindQueue(q.queue, exchangeName, "info"); // routing key

  // consume the message of the queue that we are bind
  await channel.consume(q.queue, (msg: any) => {
    const message: Message = JSON.parse(msg.content);

    // view the message that we get
    console.log(message);
  });
}

consumeMessages();
