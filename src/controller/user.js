/**
 * @Author: tangzhicheng
 * @Date: 2020-10-22 23:05:38
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-10-24 15:58:27
 * @Description: 用户数据处理层
 */

const { exec } = require('../db/mysql');

/**
 * 查找用户信息
 * @param {*} id 
 */
const findUserByKey = async (key, value) => {
  let searchValue = value;
  if (typeof value === 'string') {
    searchValue = `'${value}'`;
  }
  const sql = `select * from users where users.${key}=${searchValue} and state=1;`
  const result = await exec(sql);
  return result;
};

/**
 * 匹配用户账号密码
 * @param {*} username 
 * @param {*} password 
 */
const findUserByUP = async (username, password) => {
  const sql = `select id, username, users.password, realname from users where username='${username}' and users.password='${password}' and state=1;`
  const result = await exec(sql);
  return result;
};

/**
 * 注册用户信息
 * @param {*} username 
 * @param {*} password 
 * @param {*} author 网名
 */
const registerUserInfo = async (username, password, realname) => {
  const sql = `insert into users (username, users.password, realname) values ('${username}', '${password}', '${realname}');`
  const result = await exec(sql);
  return result;
};


module.exports = {
  findUserByKey,
  findUserByUP,
  registerUserInfo
};





