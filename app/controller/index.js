// const path = require("path");
const Router = require("koa-router");
const router = new Router();

router.use("/proxy", (ctx, next) => {
  console.log(ctx);
});

module.exports = router;
