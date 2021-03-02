const { request } = require("v-axios");
const url = require("url");
const query = require("../model/connect");

const isSlash = (url) => {
  return url[0] === "/";
};

const urlResolve = (...urls) => {
  let nUrl = "";
  for(let url of urls) {
    nUrl += isSlash(url) ? url.slice(1) : url;
  }

  return nUrl;
};

module.exports = (key, ctx) => {
  return query(`select proxy_url from proxy_info where proxy_key='${key}'`).then((results) => {
    const result = results[0];

    if(result) {
      const nUrl = new url.URL(result.proxy_url);

      nUrl.pathname = urlResolve(nUrl.pathname, ctx.request.path.replace("/proxy", ""));

      const searchParams = ctx.request.URL.searchParams;

      searchParams.delete("proxy_key");

      return request(nUrl.href, ctx.method)(null, {
        params: searchParams,
        data: ctx.req.body,
      });
    } else {
      return {
        code: 500,
        message: "key值不存在，请先去设置代理获取到key值后在尝试！",
      };
    }
  });
};
