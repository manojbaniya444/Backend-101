import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoloader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/random";

const PORT = 8080;
const PROTO_FILE = "./proto/random.proto";

// package definition

const packageDefinition = protoloader.loadSync(
  path.resolve(__dirname, PROTO_FILE)
);
// grpc object
const grpcObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

// getting new client object
const client = new grpcObject.randomPackage.RandomService(
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
  // like fetch but grpc
  client.PingAndPong({ message: "Hello", id: "id1" }, (error, result) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log("Received Result", result);
  });

  // another
  const stream = client.RandomNumbers({ maxVal: 100 });
  // data event on server sent
  stream.on("data", (chunk) => {
    console.log(chunk);
  });

  // on ending of the stream response
  stream.on("end", () => {
    console.log("Communication done");
  });

  // for todo
  const streamClient = client.todoList((err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("Got todo from server: ", result);
  });

  // write teh stream to the server
  streamClient.write({
    task: "finish gRPC now",
    status: "Done",
  });
  streamClient.write({
    task: "write API for inference",
    status: "Pending",
  });
  streamClient.write({
    task: "Watch Reelse",
    status: "Pending",
  });
  streamClient.write({
    task: "Get a wife",
    status: "Processing",
  });
  streamClient.write({
    task: "Go to GYM",
    status: "Processing",
  });
  streamClient.write({
    task: "Wake up from dream",
    status: "Processing",
  });
  streamClient.end();
}
