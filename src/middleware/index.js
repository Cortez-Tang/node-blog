/**
 * @Author: tangzhicheng
 * @Date: 2020-11-08 00:27:08
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-08 16:32:05
 * @Description: file content
 */
const { ErrorModel } = require('../model/resModel');

// 检测是是否登录
const checkLogin = (req, res, next) => {
  if (req.session.username) {
    next();
    return;
  }
  res.statusCode = 401;
  res.json(new ErrorModel('请先登录哦，宝贝！'));
}


module.exports = {
  checkLogin
};