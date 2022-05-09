#!/usr/bin/env node

const http = require("http");
const portFinder = require("portfinder");
const chalk = require("chalk");
const app = require("../app");
const pkg = require("../package.json");
const config = require("../config");
const kill = require("./kill");
const debug = require("debug")(pkg.name + ":serve");

const port = normalizePort(config.port || process.env.PORT || "3000");
const host = config.host || process.env.HOST;
const server = http.createServer(app.callback());

let handlePort;
const isProd = process.env.NODE_ENV === "production";
/**
 * 创建http 服务器
 */

if (config.portHandle === "kill") {
  handlePort = kill(port);
} else {
  portFinder.basePort = port;

  handlePort = portFinder.getPortPromise();
}

handlePort
  .then(port => {
    server.listen(port, host);
    server.on("error", onError);
    server.on("listening", onListening);
  })
  .catch(process.exit);

// 错误处理函数
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

// 监听函数
function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;

  debug("Listening on " + bind);

  if (isProd) {
    console.log("Your application is Listening on " + bind);
  } else {
    console.log(chalk.blue("http://" + (config.host || "localhost") + ":" + addr.port));
  }
}

function normalizePort(num) {
  let port = parseInt(num, 10);

  if (isNaN(port)) {
    port = 8000;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
