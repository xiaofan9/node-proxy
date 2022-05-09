const apiService = require("../service/api");

exports.setProxy = async (ctx) => {
  const { url = "" } = ctx.request.body;

  if(!url) {
    throw "参数不全";
  }

  try {
    ctx.body = await apiService.setProxy(ctx, url);
  } catch (err) {
    ctx.status = 500;

    ctx.body = {
      code: 500,
      message: String(err),
    };
  }
};
