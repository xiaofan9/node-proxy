const mysql = require("mysql");
const config = require("@root/config/db");

const connection = mysql.createConnection(config);

const query = (sql) => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if(err) throw err;

      console.log("mysql成功连接！");
    });

    connection.query("use node_proxy");
    connection.query(sql, (err, results, fields) => {
      if(err) {
        throw err;
      }

      resolve(results, fields);
    });

    connection.end((err) => {
      if(err) throw err;

      console.log("mysql关闭连接！");
    });
  });
};

module.exports = {
  query,
};
