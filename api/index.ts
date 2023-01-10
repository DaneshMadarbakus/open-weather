require("dotenv").config;

import express, { Application, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";

import { getUsers } from "./queries";

const app: Application = express();
const port = 8001;

app.use(cors());
app.use(bodyParser.json());

//Testing the db
app.get("/users", getUsers);

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    // req.user = user;
    next();
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
}

app.get("/test-data", authenticateToken, (req: Request, res: Response) => {
  console.log("Danesh /login", req.body);

  // res.json({ message: `successful request for ${req.user.name}` });
});

let refreshTokens = []; //this should be stored ideally in a database or redis cache

app.post("/token", (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken });
  });
});

app.delete("/logout", (req: Request, res: Response) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

app.post("/login", (req: Request, res: Response) => {
  console.log("Danesh /login", req.body);
  const username = req.body.username;
  const user = { name: username };

  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);

  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

app.post("/register", (req: Request, res: Response) => {
  // create token
  // add user to database
  console.log("Danesh /register", req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`App is listening on port: ${port}.`);
});
