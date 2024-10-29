"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
// const connectToRedis = async () => {
//   try {
//     await client.connect();
//     console.log("Connected to redis server.");
//   } catch (error) {
//     console.error("Failed to connect to redis server.", error);
//   }
// };
// connectToRedis();
client.connect();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    while (true) {
        // keep waiting unless there is a submission
        const response = yield client.brPop("submissions", 0);
        // TODO:actually run the users code
        console.log("received submission now executing it.");
        yield new Promise((resolve, _) => {
            // simulate code execution
            setTimeout(() => {
                console.log("Code executed:", response);
                resolve(undefined);
            }, 1000);
        });
        // TODO send to the pub sub channel for the user
        console.log("user code processed and sent to pub sub channel.");
    }
});
main();
