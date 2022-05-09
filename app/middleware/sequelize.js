const fs = require("fs");
const lodash = require("lodash");
const path = require("path");

const { Sequelize } = require("sequelize");
const dbConfig = require("../../config/db");

const autoLoadModel = async (ctx, next) => {
  try {
    if (!ctx.models.__loading) {
      const fileNames = fs.readdirSync(path.resolve(__dirname, "../model"));
  
      for (const fileName of fileNames) {
        const Model = ctx.sequelize.import("../model/" + fileName);
        const modelName = Model.tableName
          ?.split("_")
          ?.map?.((str) => {
            return lodash.capitalize(str);
          })
          ?.join("");
  
        ctx.models[modelName] = Model;
      }
  
      ctx.models.__loading = true;
  
      // 同步所有的模型
      await ctx.sequelize.sync({ alter: true });
    }
  } catch (e) {
    console.error('middleware-sequelize', String(e))
  }

  await next();
};

module.exports = async (app) => {
  // 这里使用环境变量，一般情况使用dbConfig配置即可
  const sequelize = new Sequelize(
    process.env.DB_NAME ?? dbConfig.name,
    process.env.DB_USER ?? dbConfig.user,
    process.env.DB_PASSWD ?? dbConfig.password,
    {
      host: process.env.DB_HOST ?? dbConfig.host, //数据库地址
      dialect: process.env.DB_TYPE ?? dbConfig.type, //指定连接的数据库类型
      pool: {
        max: 5, //连接池最大连接数量
        min: 0, //最小连接数量
        idle: 10000, //如果一个线程 10秒内么有被使用过的话，就释放
      },
      port: process.env.DB_PROT ?? dbConfig.port,
    }
  );

  app.context.sequelize = sequelize;
  app.context.models = {};

  app.use(autoLoadModel);
};
