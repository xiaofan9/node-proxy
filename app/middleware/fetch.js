const { cAxios } = require("v-axios");

module.exports = async (app) => {
  app.context.fetch = cAxios();
};
