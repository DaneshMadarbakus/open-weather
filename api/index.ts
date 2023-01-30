require("dotenv").config();

import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { authRoutes, userRoutes } from "./routes";

const app: Application = express();
const port = 8001;

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);
app.use(userRoutes);

app.listen(port, () => {
  console.log(`App is listening on port: ${port}.`);
});
