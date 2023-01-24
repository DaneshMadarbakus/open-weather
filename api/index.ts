require("dotenv").config();

import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

import { getUsers } from "./queries";

import { authRoutes } from "./routes";

const app: Application = express();
const port = 8001;

app.use(cors());
app.use(bodyParser.json());

app.use(authRoutes);

app.get("/users", getUsers);

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "";
const refreshTokenSecret = process.env.REFRESH_ACCESS_TOKEN || "";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token || "", accessTokenSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    // req.user = user;
    next();
  });
}

// app.get("/test-data", authenticateToken, (req: Request, res: Response) => {
//   console.log("Danesh /login", req.body);

//   // res.json({ message: `successful request for ${req.user.name}` });
// });

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
