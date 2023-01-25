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

const refreshTokenSecret = process.env.REFRESH_ACCESS_TOKEN || "";

let refreshTokens: any[] = []; //this should be stored ideally in a database or redis cache

app.post("/token", (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  // jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
  //   if (err) return res.sendStatus(403);
  //   const accessToken = generateAccessToken({ name: user.name });
  //   res.json({ accessToken });
  // });
});

app.listen(port, () => {
  console.log(`App is listening on port: ${port}.`);
});
