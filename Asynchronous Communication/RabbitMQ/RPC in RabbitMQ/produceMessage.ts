import RabbitMQClient from "./rabbitmq/rpc Client/client";

export const sendMessage = async (data: any) => {
  // this will produce the message but will not reinitialize a new connection due to the singleton in the class
  await RabbitMQClient.produce(data);
};
