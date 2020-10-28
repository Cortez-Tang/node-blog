/**
 * @Author: ,: tangzhicheng
 * @Date: ,: 2020-10-19 22:31:58
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-10-26 22:27:40
 * @Description: ,: file content
 */


const http = require('http');
const { serverHandle } = require('../app');

const PORT = 8000;

const serve =  http.createServer(serverHandle);

serve.listen(PORT, () => {
  console.log('serve is runing...');
});



