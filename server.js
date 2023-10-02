const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./app/routes");
require("dotenv").config();
const app = express();

const PORT = process.env.APP_PORT || 8050;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());

app.use("/", routes);

app.listen(PORT, process.env.NODE_HOST, () => {
  console.log(
    `Server is running on http://${process.env.NODE_HOST}:${PORT}/`
  );
});
