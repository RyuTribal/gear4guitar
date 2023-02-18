const express = require("express");
const app = express();
let bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dotenv = require("dotenv");
dotenv.config();

const product_routes = require("./routes/products");
const comments_routes = require("./routes/comments");
const user_routes = require("./routes/users");
const basket = require("./routes/basket");

const port = process.env.PORT || 8080;

const db = require("./db/auth_db");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "'Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS'"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-Auth-Token, Content-Type, Accept"
  );
  next();
});

app.use("/api/products/", product_routes);
app.use("/api/comments/", comments_routes);
app.use("/api/users/", user_routes);
app.use("/api/basket/", basket);

const server = app.listen(port, () => {
  console.log("Listening on port: " + port);

});


const gracefulShutdownHandler = function gracefulShutdownHandler(signal) {
  console.log(`⚠️ Caught ${signal}, gracefully shutting down`);
  db.end();

  setTimeout(() => {
    console.log('🤞 Shutting down application');
    // stop the server from accepting new connections
    server.close(function () {
      console.log('👋 All requests stopped, shutting down');
      // once the server is not accepting connections, exit
      process.exit();
    });
  }, 0);
};


// The SIGINT signal is sent to a process by its controlling terminal when a user wishes to interrupt the process.
process.on('SIGINT', gracefulShutdownHandler);

// The SIGTERM signal is sent to a process to request its termination.
process.on('SIGTERM', gracefulShutdownHandler);