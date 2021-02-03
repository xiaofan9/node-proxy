const Koa = require("koa");
const json = require("koa-json");
const logger = require("koa-logger");
const onerror = require("koa-onerror");
const bodyParser = require("koa-bodyparser");
const compress = require("koa-compress");
const cors = require("koa2-cors");
const errorPage = require("./app/middleware/error404");
const config = require("./config");
const router = require("./app/controller");

require("./app/model/connect");

const app = new Koa();

if (config.cors) {
  app.use(cors());
}

// koa的错误处理
onerror(app);

// gzip 压缩
app.use(
  compress({
    level: 9,
  }),
);

// 输出日志
app.use(logger());

// 捕获404错误页面
app.use(errorPage);

// 格式化json输出
app.use(json());

// 解析 post body
app.use(
  bodyParser({
    enableTypes: ["json", "form", "text"],
  }),
);

app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
