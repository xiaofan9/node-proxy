const nunjucks = require("nunjucks");
const fs = require("fs-extra");
const { extname, join } = require("path");

module.exports = ({
  path = join(process.cwd(), "app/view"),
  extension = "njk",
  type = "text/html",
  opts = {},
  conf = {},
} = {}) => {
  const env = createEnv(path, opts, conf);

  return async (ctx, next) => {
    if (ctx.render) return next();

    ctx.render = (viewFilePath, params = {}) => {
      const newPath = getPaths(path, viewFilePath, extension);

      ctx.type = type;
      ctx.body = env.render(newPath, params);
    };

    ctx.renderString = (...params) => {
      ctx.body = env.renderString(...params);
    };

    return next();
  };
};

exports.createEnv = createEnv;

function autoAdd(handle, obj, { isCover = false, hasHandle = () => false } = {}) {
  if (obj) {
    try {
      for (let key in Object.keys(obj)) {
        if (!(!isCover && hasHandle(key))) {
          handle(key, obj[key]);
        }
      }
    } catch {}
  }
}

/**
 * createEnv
 * @param {string} path 视图文件夹路径
 * @param {object} opts FileSystemLoader选项参数； opts.filters, opts.extensions, opts.globals存在，将自动添加到Environment上
 * @param {object} conf Environment config配置参数
 */
function createEnv(path, opts, conf) {
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path, {
      watch: opts.watch,
      noCache: opts.noCache,
    }),
    conf,
  );

  autoAdd(env.addFilter, opts.filters);
  autoAdd(env.addExtension, opts.extensions);
  autoAdd(env.addGlobal, opts.globals);

  return env;
}

function getPaths(path, viewFilePath, extension) {
  try {
    if(extname(viewFilePath) && extname(viewFilePath).slice(1) !== extension) {
      viewFilePath = toFile(viewFilePath, extension);
    }

    const stats = fs.lstatSync(join(path, viewFilePath));

    // 文件夹
    if (stats.isDirectory()) {
      return join(viewFilePath, toFile("index", extension));
    }

    // 文件
    return viewFilePath;
  } catch (e) {
    // 不是 文件或者文件夹
    // 假如没有拓展名，或者拓展名和自定义的不同。
    if (!extname(viewFilePath) || extname(viewFilePath).slice(1) !== extension) {
      return getPaths(path, toFile(viewFilePath, extension), extension);
    }

    throw e;
  }
}

function toFile(fileName, ext) {
  return `${fileName}.${ext}`;
}
