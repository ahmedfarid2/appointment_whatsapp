import express from "express";
import path from "path";
import bootstrap from "./src/bootstrap.js";
import { config } from "dotenv";
config({ path: path.resolve("./config/config.env") });

const app = express();
const port = process.env.PORT || 5000;

bootstrap(app, express);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
