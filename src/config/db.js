/**
 * @Author: tangzhicheng
 * @Date: 2020-10-22 23:16:46
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-10-22 23:17:40
 * @Description: 数据库连接配置
 */
const env = process.env.NODE_ENV;


let MYSQL_CONFIG;

if (env === 'development') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'my_blog'
  } 
} 

else if (env === 'production') {
  MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'my_blog'
  }
}


module.exports = {
  MYSQL_CONFIG
};