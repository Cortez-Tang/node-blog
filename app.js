/**
 * @Author: ,: tangzhicheng
 * @Date: ,: 2020-09-14 20:03:01
 * @LastEditors: ,: tangzhicheng
 * @LastEditTime: ,: 2020-10-19 23:04:16
 * @Description: ,: 应用周期
 */

const qs = require('querystring');

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
      if (!!postData) {
        req.body = {};
        resolve();
      }
      req.body = qs.parse(postData);
      resolve();
    });
  });
}


const serverHandle = async (req, res) => {
  setResponse(res);
  queryHandle(req);
  await bodyHandle (req);
  res.end(JSON.stringify({
    query: req.query,
    body: req.body
  }));
}



module.exports = {
  serverHandle
};