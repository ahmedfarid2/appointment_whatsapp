import { whatsappRouter } from "./modules";
import { globalResponse } from "./utils/errorHandling.js";

const bootstrap = (app, express) => {
  // Middleware setup
  app.use(express.json());

  // Define routes
  app.get("/", (req, res) => {
    res.send("Hello World from Bootstrap!");
  });

  app.use("/webhook", whatsappRouter);

  // Add more routes or middleware here

  app.use(globalResponse);
};

export default bootstrap;
