/**
 * @Author: ,: tangzhicheng
 * @Date: ,: 2020-09-14 20:03:01
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-10-22 23:04:07
 * @Description: ,: 应用周期
 */

const qs = require('querystring');
const { userRouteHandle } = require('./src/route/user');
const { blogRouteHandle } = require('./src/route/blog');
const { ErrorModel } = require('./src/model/resModel');

// 设置响应配置
const setResponse = (res) => {
  res.setHeader('Content-type','application/json');
}

// 处理get delete请求参数
const queryHandle = (req) => {
  const path = req.url.split('?')[0];
  const query = req.url.split('?')[1];
  req.path = path;
  req.query = qs.parse(query);
}

// 处理post put请求参数
const bodyHandle = (req) => {
  return new Promise((resolve, reject) => {
    let postData = '';
    req.on('data', chunk => {
      postData += chunk;
    });
    req.on('end', () => {
      if (!postData) {
        req.body = {};
        resolve();
        return;
      }
      req.body = JSON.parse(postData);
      resolve();
    });
  });
}


const serverHandle = async (req, res) => {
  setResponse(res);
  queryHandle(req);
  await bodyHandle (req);
  console.log(req.body);
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