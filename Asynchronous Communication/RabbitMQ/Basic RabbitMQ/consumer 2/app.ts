import amqplib from "amqplib";

// message type that we are getting from the producer
type Message = {
  logType: string;
  message: string;
  dateTime: Date;
};

async function consumeMessages() {
  // connect to the server
  const connection = await amqplib.connect("amqp://localhost");
  // create a channel
  const channel = await connection.createChannel();

  // exchange name as defined in producer
  const exchangeName = "logExchange"; // should be same

  // queue
  const q = await channel.assertQueue("InfoWarningQueue");

  // binding for info
  await channel.bindQueue(q.queue, exchangeName, "info"); // routing key

  // binding for warning
  await channel.bindQueue(q.queue, exchangeName, "warning"); // routing key

  // consume the message of the queue that we are bind
  await channel.consume(q.queue, (msg: any) => {
    // parse the json message
    const message: Message = JSON.parse(msg.content);
    // view the message that we get
    console.log(message);
    // acknowledge the message to the queue about received
    channel.ack(msg);
  });
}

consumeMessages();
