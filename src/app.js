const express = require("express");
const app = express();
const ticketRouter = require("./controller/ticketRouter");
const userRouter = require("./controller/userRouter");
const logger = require("./util/logger.js");
require("dotenv").config()
const PORT = 3000;

app.use(express.json());

const secretKey = process.env.SECRET_KEY;



app.use((req, res, next) => {
  logger.info(`Incoming ${req.method} : ${req.url}`);
  next();
});

app.use("/users", userRouter);
// app.use("/tickets", ticketRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
