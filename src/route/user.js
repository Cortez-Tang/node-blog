/**
 * @Author: tangzhicheng
 * @Date: 2020-10-22 21:57:37
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-03 18:55:52
 * @Description: 用户路由
 */

const { SuccessModel, ErrorModel } = require('../model/resModel');
const { findUserByUP, registerUserInfo, findUserByKey } = require('../controller/user');
const { redisSet } = require('../db/redis');


const userRouteHandle = async (req, res) => {
  if (req.method === 'POST' &&  req.path === '/user/login') {
    const { username, password } = req.body;
    if (!username || !password) {
      return new ErrorModel('请输入必需填写的参数');
    }
    const list = await findUserByUP(username, password);
    if (list.length > 0) {
      redisSet(req.sessionId, list[0]);
      return new SuccessModel(list[0]);
    } else {
      return new ErrorModel('账号或密码错误！');
    }
  }

  // if (req.method === 'GET' && req.path === '/user/getInfo') {
  //   const sessionData = req.session;
  //   if (!sessionData.username) {
  //     return new ErrorModel('尚未登录！');
  //   }
  //   return new SuccessModel(sessionData);
  // }

  if (req.method === 'POST' && req.path === '/user/register') {
    const { username, password, realname } = req.body;
    if (!username || !password || !realname) {
      return new ErrorModel('请输入必需填写的参数');
    }
    const list = await findUserByKey('username', username);
    if (list.length === 0) {
      const result = await registerUserInfo(username, password, realname);
      if (result.affectedRows === 1 && result.warningCount === 0) {
        return new SuccessModel(true);
      }
    } else {
      return new ErrorModel('该用户已经被注册！');
    }
  }

};


module.exports = {
  userRouteHandle
};