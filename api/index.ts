const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

app.post("/login", (req, res) => {
  console.log("Logging in", req.body.email);

  res.sendStatus(200);
});

app.listen(8001, () => {
  console.log("Server running on port 8001");
});
