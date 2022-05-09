const index = require("./controller/index");
const api = require("./controller/api");
const view = require("./controller/view");
const proxy = require("./controller/proxy");

module.exports = (router) => {
  router.get("/setting.html", view.setting);

  router.post("/api/setProxy", api.setProxy);

  router.all("/proxy/(.*)", proxy);

  router.all("(.*)", index);
};
