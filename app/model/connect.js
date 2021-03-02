const mysql = require("mysql");
const config = require("@root/config/db");

let connection;
let timeout;

const useDatabase = (database) => {
  return connection.query("use " + database);
};

const connectionDatabase = (cb, autoConnect = true) => {
  if(autoConnect && !connection) {
    connection = mysql.createConnection(config);

    connection.connect((err) => {
      if(err) throw err;

      console.log("mysql成功连接！");
    });
  }

  if(cb && typeof cb === "function") {
    cb();
  }
};

const closeDatabase = (autoClose = true, isNowClose = false) => {
  if(autoClose && connection) {
    if(!isNowClose) {
      timeout = setTimeout(close, config.timeout || 1000);
    } else {
      close();
    }
  }

  function close() {
    connection.end((err) => {
      if(err) throw err;

      console.log("mysql关闭连接！");
    });

    connection = null;
  }
};

/**
 * query
 * @param {string} sql sql语句
 * @param {boolean} autoConnect 自动连接，仅当没有连接被断开或没有连接才会自动连接
 * @param {boolean} autoClose 自动关闭, 默认 1s内没有sql执行会进行自动关闭
 */
const query = (sql, autoConnect, autoClose, isNowClose) => {
  return new Promise((resolve, reject) => {
    connectionDatabase(() => {
      clearTimeout(timeout);
      useDatabase("node_proxy");

      connection.query(sql, (err, results, fields) => {
        closeDatabase(autoClose, isNowClose);

        if(err) {
          throw err;
        }

        resolve(results, fields, connection);
      });
    }, autoConnect, autoClose, isNowClose);
  });
};

module.exports = query;
