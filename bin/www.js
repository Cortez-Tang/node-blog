/**
 * @Author: tangzhicheng
 * @Date: 2020-10-19 22:31:58
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-03 19:13:48
 * @Description: file content
 */


const http = require('http');
const { serverHandle } = require('../app');

const PORT = 8000;

const serve = http.createServer(serverHandle);

serve.listen(PORT, () => {
  console.log(`port: ${PORT} serve is runing...`);
});



