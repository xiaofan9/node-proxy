module.exports = (router) => {
  router.get("/setting", (ctx, next) => {
    ctx.render("setting", {
      test: "123",
    });
  });

  router.post("/api/setProxy", (ctx, next) => {

  });

  router.all("(.*)", (ctx, next) => {
    ctx.body = "";
  });
};
