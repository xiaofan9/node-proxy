module.exports = (router) => {
  router.get("/setting", (ctx, next) => {
    ctx.render("setting");
  });

  router.post("/api/setProxy", (ctx, next) => {

  });

  router.all("/proxy/(.*)", (ctx, next) => {
    ctx.body = "";
  });

  router.all("/", (ctx, next) => {
  });
};
