const KoaRouter = require("@koa/router");
const router = new KoaRouter();
const routes = require("../router");

module.exports = (app) => {
  app
    .use(router.routes())
    .use(router.allowedMethods());

  routes(router);
};
