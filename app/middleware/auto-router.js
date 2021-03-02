const KoaRouter = require("@koa/router");
const router = new KoaRouter();
const routes = require("@app/router");

module.exports = (app) => {
  app
    .use(router.routes())
    .use(router.allowedMethods());

  routes(router);
};
