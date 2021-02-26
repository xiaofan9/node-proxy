const mysql = require("mysql");
const config = require("@root/config/db");

let connection;

const useDatabase = (database) => {
  return connection.query("use " + database);
};

const connectionDatabase = (cb, autoConnect = true, autoEnd = true) => {
  if(autoConnect) {
    if(!connection) {
      connection = mysql.createConnection(config);
    }

    connection.connect((err) => {
      if(err) throw err;

      console.log("mysql成功连接！");
    });
  }

  cb && cb();

  if(autoEnd && connection) {
    connection.end((err) => {
      if(err) throw err;

      console.log("mysql关闭连接！");
    });

    connection = null;
  }
};

const query = (sql) => {
  return new Promise((resolve, reject) => {
    connectionDatabase(() => {
      useDatabase("node_proxy");

      connection.query(sql, (err, results, fields) => {
        if(err) {
          throw err;
        }

        resolve(results, fields);
      });
    });
  });
};

module.exports = query;
