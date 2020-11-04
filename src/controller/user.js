/**
 * @Author: tangzhicheng
 * @Date: 2020-10-22 23:05:38
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-04 23:14:36
 * @Description: 用户数据处理层
 */

const { exec, escape } = require('../db/mysql');

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
  const _usename = escape(username);
  const _password = escape(password);
  const sql = `select id, username, users.password, realname from users where username=${_usename} and users.password=${_password} and state=1;`

  console.log(sql);
  const result = await exec(sql);
  return result;
};

/**
 * 注册用户信息
 * @param {*} username 
 * @param {*} password 
 * @param {*} realname
 */
const registerUserInfo = async (username, password, realname) => {
  const _usename = escape(username);
  const _password = escape(password);
  const _realname = escape(realname);
  const sql = `insert into users (username, users.password, realname) values (${_usename}, ${_password}, ${_realname});`
  const result = await exec(sql);
  return result;
};


module.exports = {
  findUserByKey,
  findUserByUP,
  registerUserInfo
};





