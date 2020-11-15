/**
 * @Author: tangzhicheng
 * @Date: 2020-11-08 00:12:39
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-08 16:49:59
 * @Description: file content
 */

const express = require('express');
const router = express.Router();

const { SuccessModel, ErrorModel } = require('../model/resModel');
const { findUserByUP, registerUserInfo, findUserByKey } = require('../controller/user');



router.post('/login', async (req, res) => {
  let result;
  const { username, password } = req.body;
  if (!username || !password) {
    result =  new ErrorModel('请输入必需填写的参数');
  }
  const list = await findUserByUP(username, password);
  if (list.length > 0) {
    console.log(req.session);
    req.session.uid = list[0].id;
    req.session.username = list[0].username;
    req.session.realname = list[0].realname;

    result =  new SuccessModel(req.session);
  } else {
    result =  new ErrorModel('账号或密码错误！');
  }

  res.json(result);
});

router.post('/register',async (req, res) => {
  const { username, password, realname } = req.body;
  let result;
  if (!username || !password || !realname) {
    result = new ErrorModel('请输入必需填写的参数');
  }
  const list = await findUserByKey('username', username);
  if (list.length === 0) {
    const data = await registerUserInfo(username, password, realname);
    if (data.affectedRows === 1 && data.warningCount === 0) {
      result = new SuccessModel(true);
    }
  } else {
    result = new ErrorModel('该用户已经被注册！');
  }

  res.json(result);
});

module.exports = router;