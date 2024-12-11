import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static("public"));

app.get("/html", (req, res) => {
  res.sendFile(__dirname + "/views" + "/homepage.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname +  "/views/about.html");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
