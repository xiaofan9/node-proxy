const {
  Proxy,
} = require("../service/api");

exports.setProxy = async (ctx) => {
  const { url = "" } = ctx.request.body;

  if(!url) {
    ctx.status = 500;

    ctx.body = {
      code: 500,
      message: "参数不全",
    };

    return;
  }

  ctx.body = await Proxy.set(url);
};
