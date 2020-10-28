/**
 * @Author: tangzhicheng
 * @Date: 2020-10-26 22:24:14
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-10-28 23:02:43
 * @Description: file content
 */

const qs = require('querystring');
const { redisSet } = require('../db/redis')

// 设置响应配置
const setResponse = (res) => {
  res.setHeader('Content-type','application/json');
};

// 处理get delete请求参数
const queryHandle = (req) => {
  const path = req.url.split('?')[0];
  const query = req.url.split('?')[1];
  req.path = path;
  req.query = qs.parse(query);
};

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
};

// 处理cookie
const cookieHandle = (req) => {
  const cookie = {};
  const cookieStr = req.headers.cookie;
  if (!cookieStr) {
    req.cookie = cookie;
    return;
  };
  const cookieItems = cookieStr.split('; ');
  cookieItems.forEach(item => {
    const key = item.split('=')[0];
    const value = item.split('=')[1];
    cookie[key] = value;
  });
  req.cookie = cookie;
};

// 处理session
const sessionHandle = (req, res) => {
  let userId = req.cookie.uid;
  if (!userId) {
    userId = `${Date.now()}_user_ds`;
    res.setHeader('Set-Cookie', `uid=${userId}; path=/; httpOnly`);
    redisSet(userId, {});
  }
  req.sessionId = userId;
};

module.exports = {
  setResponse,
  queryHandle,
  bodyHandle,
  cookieHandle,
  sessionHandle
};