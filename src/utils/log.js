/**
 * @Author: tangzhicheng
 * @Date: 2020-11-04 15:26:31
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-04 17:07:35
 * @Description: 日志记录
 */


const fs = require('fs');
const path = require('path');

const createWriteStream = (filename) => {
  const writeStream = fs.createWriteStream(
    path.join(__dirname, '../', '../', 'logs', filename), 
    { flags: 'a' }
  );

  return writeStream;
};

const writeLog = (writeStream, log) => {
  writeStream.write(log + '\n');
};


const accessStream = createWriteStream('access.log');
const access = (log) => {
  writeLog(accessStream, log);
}


module.exports = {
  access
};