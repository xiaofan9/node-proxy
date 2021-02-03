const mysql = require("mysql");
const config = require("../../config/db");

const db = mysql.createConnection(config);

db.connect((err) => {
  if(err) throw err;

  console.log("连接成功！");
});

module.exports = {

};
