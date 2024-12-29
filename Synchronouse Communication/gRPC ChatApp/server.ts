import * as grpc from "@grpc/grpc-js";
import * as protoloader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/chat";
import { ChatServiceHandlers } from "./proto/chatPackage/ChatService";

import path from "node:path";
import { ChatRequest } from "./proto/chatPackage/ChatRequest";
import { ChatResponse } from "./proto/chatPackage/ChatResponse";

const PORT = 8000;
const PROTO_FILE = "./proto/chat.proto";

const packageDefinition = protoloader.loadSync(
  path.resolve(__dirname, PROTO_FILE)
);

const grpcObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const chatPackage = grpcObject.chatPackage;

const callObjectByUsername = new Map<
  string,
  grpc.ServerDuplexStream<ChatRequest, ChatResponse>
>();

function main() {
  const server = getServer();

  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error(error);
        return;
      }

      console.log(`Server is running on localhost:${port}`);
    }
  );
}

function getServer() {
  const server = new grpc.Server();
  server.addService(chatPackage.ChatService.service, {
    // out services here
    Chat: (call: grpc.ServerDuplexStream<ChatRequest, ChatResponse>) => {
      call.on("data", (chunk) => {
        const username = call.metadata.get("username")[0] as string;
        const message = chunk.msg;

        console.log(`Received: ${username}: ${message}`);

        // broadcast to all other users
        for (let [user, usersCall] of callObjectByUsername) {
          if (username !== user) {
            console.log("forawding message to", user, message);
            usersCall.write({
              username: username,
              msg: message,
            });
          }
        }

        // add the user to the list
        if (callObjectByUsername.get(username) === undefined) {
          callObjectByUsername.set(username, call);
        }
      });
      // after getting the data
      call.on("end", () => {
        // after user disconnect delete the user
        const username = call.metadata.get("username")[0] as string;
        callObjectByUsername.delete(username);

        for (let [user, usersCall] of callObjectByUsername) {
          usersCall.write({
            username: username,
            msg: "Has Left the Chat",
          });
        }

        call.write({
          username: "Server",
          msg: `Thank you for chatting ${username}`,
        });

        // end the server
        call.end();
      });
    },
  } as ChatServiceHandlers);

  return server;
}

main();
