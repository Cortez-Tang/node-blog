/**
 * @Author: tangzhicheng
 * @Date: 2020-10-22 23:15:17
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-04 23:11:31
 * @Description: 数据库连接层
 */

const mysql = require('mysql');

mysql.escape

const { MYSQL_CONFIG } = require('../config/db');

const connection = mysql.createConnection(MYSQL_CONFIG);

connection.connect((err) => {
  if(err) {
    console.error('database connect errror: ', err);
  }
  console.log('connect success: ', connection.threadId);
});

const exec = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if(err) {
        reject(err);
      };
      resolve(result);
    });
  });
}


module.exports = {
  exec,
  escape: mysql.escape
};