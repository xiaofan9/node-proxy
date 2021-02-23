const mysql = require("mysql");
const config = require("@root/config/db");

const db = mysql.createConnection(config);

db.connect((err) => {
  if(err) throw err;

  console.log("mysql成功连接！");
});

db.end((err) => {
  if(err) throw err;

  console.log("mysql关闭连接！");
});

module.exports = {

};
