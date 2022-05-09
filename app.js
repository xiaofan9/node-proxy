const Koa = require("koa");
const json = require("koa-json");
const logger = require("koa-logger");
const onerror = require("koa-onerror");
const bodyParser = require("koa-body");
const compress = require("koa-compress");
const cors = require("koa2-cors");
const errorPage = require("./app/middleware/error-page");
const autoRouter = require("./app/middleware/auto-router");
const nunjucks = require("./app/middleware/nunjucks");
const sequelize = require("./app/middleware/sequelize")

const config = require("./config");

const app = new Koa();

if (config.cors) {
  app.use(cors(config.corsConfig));
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

app.use(nunjucks({
  extension: "html",
}));

// 格式化json输出
app.use(json());

// 解析 post body
app.use(
  bodyParser({
    multipart: true,
    enableTypes: ["json", "form", "text"],
  }),
);

sequelize(app);

// 自动加载路由
autoRouter(app);

module.exports = app;
