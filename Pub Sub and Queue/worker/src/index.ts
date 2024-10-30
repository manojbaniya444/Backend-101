import { createClient } from "redis";

const client = createClient();

async function processSubmission(submission: string) {
  const { problemId, code, language } = JSON.parse(submission);

  console.log("Processing submission for problemId: ", problemId);
  console.log("Code: ", code);
  console.log("Language: ", language);

  // TODO: spin up a new process to test the code here

  // simulating
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("Complete processing for problemId: ", problemId);

  client.publish(
    "done",
    JSON.stringify({
      problemId,
      code,
      language,
    })
  );
}

const main = async () => {
  await client.connect();

  while (true) {
    // keep waiting unless there is a submission
    const response = await client.brPop("submissions", 0);
    try {
      console.log("received submission now executing it.");
      await processSubmission(response);
    } catch (error) {
      console.error("Error processing submission: ", error);
    }
    console.log("user code processed and sent to pub sub channel.");
  }
};

main();
