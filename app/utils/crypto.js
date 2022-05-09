const crypto = require("crypto");

const md5 = (content) => crypto.createHash("md5").update(content).digest("hex");

exports.md5 = md5;
