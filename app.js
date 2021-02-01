const path = require("path");
const Koa = require("koa");
const json = require("koa-json");
const logger = require("koa-logger");
const onerror = require("koa-onerror");
const bodyParser = require("koa-bodyparser");
const compress = require("koa-compress");
const errorPage = require("./app/middleware/error404");
const cors = require("koa2-cors");
const config = require("./config");
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

app.use((ctx) => {
  ctx.body = ctx.request.body;

  console.log(ctx.query, ctx.request.header);
});

module.exports = app;
