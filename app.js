import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import apiRoutes from "./routes/api/main.js";
import { database } from "./libs/database/config.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api", apiRoutes);

app.get("*", (req, res, next) => {
  res.sendStatus(404);
});

database
  .initialize()
  .then(() => {
    app.listen(2000, () => {
      console.log(`Running at: http://localhost:${2000}`);
    });
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });
