module.exports = (ctx) => {
  if(ctx.req.url !== "/") {
    ctx.redirect("/");
  } else {
    ctx.render("index");
  }
};
