const express = require("express");

const setMiddlewares = require("./config/middlewares");
const errorHandler = require("./config/errorHandler");
const router = require("./routes");

const { PORT = 5000 } = process.env;

const app = express();

setMiddlewares(app);

app.use("/api", router);

app.use(errorHandler);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
