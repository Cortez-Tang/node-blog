/**
 * @Author: tangzhicheng
 * @Date: 2020-10-22 21:57:37
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-10-22 22:39:50
 * @Description: 用户路由
 */

const { SuccessModel, ErrorModel } = require('../model/resModel');

const userRouteHandle = async (req, res) => {
  if (req.method === 'POST' &&  req.path === '/user/login') {
    const { username, password } = req.body;
    if (!username || !password) {
      return new ErrorModel('请输入必需填写的参数');
    }
    return new SuccessModel({
      id: 123,
      username: 'sdadsa'
    });
  }

  if (req.method === 'POST' && req.path === '/user/register') {
    const { username, password, author } = req.body;
    console.log(username, password, author);
    if (!username || !password || !author) {
      return new ErrorModel('请输入必需填写的参数');
    }
    return new SuccessModel(true);
  }

};


module.exports = {
  userRouteHandle
};