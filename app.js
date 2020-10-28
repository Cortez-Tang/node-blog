/**
 * @Author: ,: tangzhicheng
 * @Date: ,: 2020-09-14 20:03:01
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-10-28 22:59:31
 * @Description: ,: 应用周期
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
  sessionHandle(req, res)
  await bodyHandle (req);
  console.log(req.path);
  const userResult = await userRouteHandle(req, res);
  if (userResult) {
    return res.end(JSON.stringify(userResult));;
  }

  const blogResult = await blogRouteHandle(req, res);
  if (blogResult) {
    return res.end(JSON.stringify(blogResult));
  }


  return res.end(JSON.stringify(new ErrorModel('404')));
}



module.exports = {
  serverHandle
};