import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import readline from "node:readline";

import { ProtoGrpcType } from "./proto/chat";

const PORT = 8000;
const FILE_PROTO = "./proto/chat.proto";

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, FILE_PROTO)
);
const grpcObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

const client = new grpcObject.chatPackage.ChatService(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);

// being ready
client.waitForReady(deadline, (error) => {
  if (error) {
    console.error(error);
    return;
  }

  onClientReady();
});

function onClientReady() {
  // set the metadata for the user
  const username = process.argv[2];
  if (!username) console.error("No username given"), process.exit(0);
  const metadata = new grpc.Metadata();
  metadata.set("username", username);
  // input]
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const call = client.Chat(metadata);

  call.write({
    msg: "registering",
  });

  call.on("data", (chunk) => {
    console.log(`${chunk.username} : ${chunk.msg}`);
  });

  rl.on("line", (line) => {
    if (line === "quit") {
      call.end();
      process.exit(0)
    }

    call.write({
      msg: line,
    });
  });
}
