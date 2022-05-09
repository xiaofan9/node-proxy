const { urlResolve } = require("../utils");
const { md5 } = require("../utils/crypto");
const fs = require("fs");
const path = require("path");

module.exports = {
  async setProxy(ctx, url) {
    const proxyUrl = urlResolve(url);
    const proxyData = await ctx.models.ProxyInfo.findOne({
      where: {
        proxy_url: proxyUrl,
      },
      raw: true,
    });

    const proxyKey = md5(proxyUrl);

    let message = ''

    if(!proxyData) {
      await ctx.models.ProxyInfo.create({
        proxy_key: proxyKey,
        proxy_url: proxyUrl,
      })

      message = '设置成功！'
    } else {
      message = '已经存在！'
    }

    return {
      code: 200,
      message,
      data: proxyKey,
    };
  },
};
