const proxyService = require("../service/proxy");

module.exports = async (ctx, next) => {
  try {
    const { proxy_key: key } = ctx.query || {};

    if (!key) {
      throw "请提供proxy_key值！";
    }

    const result = await proxyService(ctx, key);

    ctx.body = result;
  } catch (err) {
    ctx.status = 500;

    ctx.body = {
      code: 500,
      message: String(err),
    };
  }
};
