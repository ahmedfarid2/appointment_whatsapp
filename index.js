import express from "express";
import path from "path";
import { config } from "dotenv";
config({ path: path.resolve("./config/config.env") });

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
