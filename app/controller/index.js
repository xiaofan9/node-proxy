// const path = require("path");
const Router = require("@koa/router");
const router = new Router();
// const { cAxios } = require("v-axios");

// const {

// } = cAxios({
//   baseURL:
// })

router.all("/proxy", (ctx, next) => {
  console.log(ctx.query.test, ctx.request.body, ctx.request.files);

  ctx.body = "1111";
});

module.exports = router;
