/**
 * @Author: tangzhicheng
 * @Date: 2020-10-28 22:47:30
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-03 16:05:19
 * @Description: file content
 */

const redis = require('redis');
const { REDIS_CONFIG } = require('../config/db');

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

redisClient.on('error', (error) => {
  console.error(error);
});


const redisSet = (key, val) => {
  return new Promise((resole, reject) => {
    if (!key || !val) {
      reject('key or value not defined');
    }
    let value = val;
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    redisClient.set(key, value, () => {
      resole(true);
    });
    
  });
}

const redisGet = (key) => {
  return new Promise((resolve, reject) => {
    if (!key) {
      reject('key is not defined');
    }
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
      }

      if (val === null) {
        resolve(null);
      }

      try {
        resolve(JSON.parse(val));
      } catch (error) {
        resolve(val);
      }
    });
  });
}


module.exports = {
  redisSet,
  redisGet
}

