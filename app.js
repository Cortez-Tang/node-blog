/**
 * @Author: tangzhicheng
 * @Date: 2020-09-14 20:03:01
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-03 19:14:16
 * @Description: 应用周期
 */

const qs = require('querystring');
const { userRouteHandle } = require('./src/route/user');
const { blogRouteHandle } = require('./src/route/blog');
const { ErrorModel } = require('./src/model/resModel');
const { setResponse, queryHandle, bodyHandle, cookieHandle, sessionHandle } = require('./src/middleware');


const serverHandle = async (req, res) => {
  setResponse(res);
  queryHandle(req);
  cookieHandle(req);
  await sessionHandle(req, res);
  await bodyHandle (req);
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