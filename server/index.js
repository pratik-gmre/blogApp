require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const connectTOMongo = require("./utils/db.js");
const userRouter = require("./routes/user.route.js");
const authRouter = require("./routes/auth.route.js");

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3005;

app.get("/", (req, res) => {
  res.status(200).send("welcome");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

//middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Intenal server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

connectTOMongo().then(() => {
  try {
    const myServer = http.createServer(app);
    myServer.listen(port, () => {
      console.log(`connected to sever at port ${port}`);
    });
  } catch (error) {
    console.log("server error:", error);
  }
});
