const proxy = require("../service/proxy");

module.exports = async(ctx, next) => {
  const { proxy_key: key } = ctx.query || {};

  if(!key) {
    ctx.status = 500;

    ctx.body = {
      code: 500,
      message: "请提供key值！",
    };
  }

  const result = await proxy(key, ctx).catch(e => {
    ctx.status = 404;

    ctx.body = {
      code: 404,
      message: "路径不存在！",
    };
  });

  ctx.body = result;
};
