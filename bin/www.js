/**
 * @Author: ,: tangzhicheng
 * @Date: ,: 2020-10-19 22:31:58
 * @LastEditors: ,: tangzhicheng
 * @LastEditTime: ,: 2020-10-19 22:38:24
 * @Description: ,: file content
 */


const http = require('http');
const { serverHandle } = require('../app');

const PORT = 8080;

const serve =  http.createServer(serverHandle);

serve.listen(PORT, () => {
  console.log('serve is runing...');
});



