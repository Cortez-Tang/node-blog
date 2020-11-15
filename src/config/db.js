/**
 * @Author: tangzhicheng
 * @Date: 2020-10-22 23:16:46
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-07 20:40:23
 * @Description: 数据库连接配置
 */
const env = process.env.NODE_ENV;


let MYSQL_CONFIG;
let REDIS_CONFIG;

if (env === 'development') {
  MYSQL_CONFIG = {
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'my_blog'
  }


  REDIS_CONFIG = {
    port: '6379',
    host: '127.0.0.1'
  }
  
} 

else if (env === 'production') {
  MYSQL_CONFIG = {
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'my_blog'
  }

  REDIS_CONFIG = {
    port: '6379',
    host: '127.0.0.1'
  }
}


module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG
};