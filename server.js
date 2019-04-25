const express = require("express");

const setMiddlewares = require("./config/middlewares");
const router = require("./routes");

const { PORT = 5000 } = process.env;

const app = express();

setMiddlewares(app);

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
