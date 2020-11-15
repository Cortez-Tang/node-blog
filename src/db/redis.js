/**
 * @Author: tangzhicheng
 * @Date: 2020-10-28 22:47:30
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-08 16:31:33
 * @Description: file content
 */

const redis = require('redis');
const { REDIS_CONFIG } = require('../config/db');

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

redisClient.on('error', (error) => {
  console.error(error);
});


module.exports = {
  redisClient
}

