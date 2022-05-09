const url = require("url");
const { urlResolve } = require("../utils");

module.exports = async (ctx, key) => {
  const proxyData = await ctx.models.ProxyInfo.findOne({
    where: {
      proxy_key: key,
    },
    raw: true,
  });

  if (proxyData) {
    const nUrl = new url.URL(proxyData.proxy_url);
    const searchParams = ctx.request.URL.searchParams;

    nUrl.pathname = urlResolve(
      nUrl.pathname,
      ctx.request.path.replace("/proxy", "")
    );

    searchParams.delete("proxy_key");

    const res = await ctx.fetch.request( nUrl.href,ctx.method)(null, {
      params: searchParams??{},
      data: ctx.req.body ?? {},
    });

    return res.data;
  } else {
    throw "proxy_key值不存在，请先去设置代理获取到proxy_key值后在尝试！";
  }
};
