import { createClient } from "redis";

const client = createClient();

client.connect();

const main = async () => {
  while (true) {
    // keep waiting unless there is a submission
    const response = await client.brPop("submissions", 0);

    // TODO:actually run the users code

    console.log("received submission now executing it.");
    await new Promise((resolve, _) => {
      // simulate code execution
      setTimeout(() => {
        console.log("Code executed:", response);
        resolve(undefined);
      }, 1000);
    });

    // TODO send to the pub sub channel for the user

    console.log("user code processed and sent to pub sub channel.");
  }
};

main();
