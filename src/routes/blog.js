/**
 * @Author: tangzhicheng
 * @Date: 2020-11-08 00:12:43
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-08 16:51:43
 * @Description: file content
 */
const express = require('express');
const router = express.Router();
const { checkLogin } = require('../middleware');

const { SuccessModel, ErrorModel } = require('../model/resModel');
const { searchBlogs, addBlog, findBlogById, updateBlog, deleteBlog } = require('../controller/blog');

router.get('/list', async (req, res) => {
  let result;
  const { keyword, page, size, u_id } = req.query;
  if (!page) {
    result = new ErrorModel('请输入必需填写的参数');
  }
  
  const list = await searchBlogs(keyword, page, size || null, u_id || null); 
  result = new SuccessModel(list);

  res.json(result);
});

router.get('/detail', async (req, res) => {
  let result;
  const { id } = req.query; 
  if (!id) {
    result = new ErrorModel('请输入必需填写的参数');
  }

  const list = await findBlogById(id);
  if (list.length > 0) {
    result = new SuccessModel(list[0]);
  } else {
    result = new ErrorModel('请输入正确的id！');
  }

  res.json(result);
});


router.post('/add', checkLogin, async (req, res) => {
  let result;
  const { title, content } = req.body;

  if (!title || !content) {
    result = new ErrorModel('请输入必需填写的参数');
  }

  const data = await addBlog(req.session.uid, title, content, req.session.username);
  if (data.affectedRows === 1 && data.warningCount === 0) {
    result = new SuccessModel(true);
  } else {
    result = new ErrorModel('博客发布失败！');
  }

  res.json(result);
});

router.put('/update', checkLogin, async (req, res) => {
  let result;
  const { id, title, content } = req.body;
  if (!id || !title || !content) {
    result = new ErrorModel('请输入必需填写的参数');
  }

  const data = await updateBlog(req.session.uid, id, title, content);
  if (data.affectedRows === 1 && data.warningCount === 0) {
    result = new SuccessModel(true);
  } else {
    result = new ErrorModel('博客修改失败！');
  }

  res.json(result);
});

router.delete('/del', checkLogin, async (req, res) => {
  let result;
  const { id } = req.query;
  if (!id) {
    result = new ErrorModel('请输入必需填写的参数');
  }
  const data = await deleteBlog(id);
  if (data.affectedRows === 1 && data.warningCount === 0) {
    result = new SuccessModel(data);
  } else {
    result = new ErrorModel('博客删除失败！');
  }

  res.json(result);
});


module.exports = router;