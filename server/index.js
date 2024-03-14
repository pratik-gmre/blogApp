require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const connectTOMongo = require("./utils/db.js");

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3005;

app.get("/", (req, res) => {
  res.status(200).send("welcome");
});

connectTOMongo().then(() => {
  try {
    const myServer = http.createServer(app);
    myServer.listen(port, () => {
      console.log("connected to sever");
    });
  } catch (error) {
    console.log("server error:", error);
  }
});
