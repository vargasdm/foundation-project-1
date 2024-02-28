const express = require("express");
const app = express();
const ticketRouter = require("./controller/ticketRouter.js");
const userRouter = require("./controller/userRouter.js");
const logger = require("./util/logger.js");
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Incoming ${req.method} : ${req.url}`);
  next();
});

app.use("/tickets", ticketRouter);
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
