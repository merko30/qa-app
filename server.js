const express = require("express");
const path = require("path");

const setMiddlewares = require("./config/middlewares");
const errorHandler = require("./config/errorHandler");
const router = require("./routes");

const { PORT = 5000 } = process.env;

const app = express();

setMiddlewares(app);

app.use("/api", router);

app.use(errorHandler);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
