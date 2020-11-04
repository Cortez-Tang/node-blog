/**
 * @Author: tangzhicheng
 * @Date: 2020-09-14 20:03:01
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-04 19:50:05
 * @Description: 应用周期
 */

const qs = require('querystring');
const { userRouteHandle } = require('./src/route/user');
const { blogRouteHandle } = require('./src/route/blog');
const { ErrorModel } = require('./src/model/resModel');
const { setResponse, queryHandle, bodyHandle, cookieHandle, sessionHandle } = require('./src/middleware');
const { access } = require('./src/utils/log');


const serverHandle = async (req, res) => {
  // 记录日志
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`);

  // 处理请求数据和配置
  setResponse(res);
  queryHandle(req);
  cookieHandle(req);
  await sessionHandle(req, res);
  await bodyHandle (req);

  // 处理路由
  const userResult = await userRouteHandle(req, res);
  if (userResult) {
    return res.end(JSON.stringify(userResult));;
  }

  const blogResult = await blogRouteHandle(req, res);
  if (blogResult) {
    return res.end(JSON.stringify(blogResult));
  }

  res.statusCode = 404;
  return res.end(JSON.stringify(new ErrorModel('404')));
}

module.exports = {
  serverHandle
};