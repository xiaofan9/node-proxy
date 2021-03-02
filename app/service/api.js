const query = require("../model/connect");
const { md5 } = require("../service/crypto");

exports.Proxy = {
  set(url) {
    return query(`select * from proxy_info where proxy_url='${url}'`).then((results) => {
      if(!results.length) {
        return query(`INSERT INTO proxy_info (proxy_key, proxy_url) VALUES('${md5(url)}', '${url}')`).then((results) => {
          return {
            code: 200,
            message: "设置成功！",
            data: md5(url),
          };
        });
      } else {
        return {
          code: 200,
          message: "已经设置！",
          data: md5(url),
        };
      }
    });
  },
};
