import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoloader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/random";
import { RandomServiceHandlers } from "./proto/randomPackage/RandomService";

const PORT = 8080;
const PROTO_FILE = "./proto/random.proto";

const packageDefinition = protoloader.loadSync(
  path.resolve(__dirname, PROTO_FILE)
);

const grpcObject = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;
const randomPackage = grpcObject.randomPackage;

// for the client todo stream list an database for todo
type Todo = {
  task: string;
  status: string;
};
const todoList: Todo[] = [];

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
      console.log(`Your server has started on PORT: ${port}`);
      //   server.start(); depreciated
    }
  );
}

function getServer() {
  const server = new grpc.Server();
  server.addService(randomPackage.RandomService.service, {
    // simple request------------------------------------------
    PingAndPong: (req, res) => {
      console.log("Got request from the client");
      // send the response
      res(null, { message: "Pong", id: "msg1" });
    },
    // unary stream----------------------------------------------
    RandomNumbers: (call) => {
      const { maxVal = 10 } = call.request;

      console.log("Got max value: ", maxVal);

      let count = 0;

      // to se how the stream work we are running in interval
      const runInterval = setInterval(() => {
        count++;
        if (count > 10) {
          // after the max count reaches we clear the interval and end the stream
          clearInterval(runInterval);
          call.end();
        }
        // write the stream
        call.write({ randomN: Math.floor(Math.random() * maxVal) });
      }, 100);
    },
    // toodo stream---------------------------------------------
    TodoList: (call, callback) => {
      call.on("data", (chunk) => {
        console.log("Got Todo from client", chunk);
        todoList.push(chunk);
      });
      // on end of the data read
      call.on("end", () => {
        //     repeated TodoItem tasks = 1;
        // yo wala haalne hai
        callback(null, { tasks: todoList });
      });
    },
  } as RandomServiceHandlers);
  return server;
}

main();
