/**
 * @Author: tangzhicheng
 * @Date: 2020-10-26 22:24:14
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-04 09:11:05
 * @Description: file content
 */

const qs = require('querystring');
const user = require('../controller/user');
const { redisSet, redisGet } = require('../db/redis')

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
const sessionHandle = async (req, res) => {
  let userId = req.cookie.uid;
  if (!userId) {
    const expiresDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toGMTString();
    userId = `${Date.now()}_user_ds`;
    res.setHeader('Set-Cookie', `uid=${userId}; path=/; expires=${expiresDate}; httpOnly`);
    redisSet(userId, {});
  }
  req.sessionId = userId;
  req.session = await redisGet(req.sessionId) || {};
};

const checkLogin = async (req, res) => {
  if (req.session.username) {
    return true;
  }
  res.statusCode = 401;
  return false;
};

module.exports = {
  setResponse,
  queryHandle,
  bodyHandle,
  cookieHandle,
  sessionHandle,
  checkLogin
};