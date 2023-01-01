import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app: Application = express();
const port = 8001;

app.use(cors());
app.use(bodyParser.json());

app.post("/login", (req: Request, res: Response) => {
  // create token
  // add user to database
  console.log("Danesh /login", req.body);
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
