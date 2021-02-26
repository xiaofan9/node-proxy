module.exports = (ctx, next) => {
  console.log(ctx.query.test, ctx.request.body, ctx.request.files);

  ctx.render("test");
};
