/**
 * @Author: tangzhicheng
 * @Date: 2020-10-22 21:57:44
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-04 09:09:08
 * @Description: 博客路由
 */

const { SuccessModel, ErrorModel } = require('../model/resModel');
const { searchBlogs, addBlog, findBlogById, updateBlog, deleteBlog } = require('../controller/blog');
const { checkLogin } = require('../middleware');


const blogRouteHandle = async (req, res) => {
  if (!req.path.includes('blog')) {
    return false;
  } 

  if (!await checkLogin(req, res)) {
    return new ErrorModel('请先登录!');
  }

  if (req.method === 'GET' &&  req.path === '/blog/list')  {
    const { keyword, page, size, u_id } = req.query;
    if (!page) {
      return new ErrorModel('请输入必需填写的参数');
    }
    
    const list = await searchBlogs(keyword, page, size || null, u_id || null); 
    return new SuccessModel(list);
  }

  if (req.method === 'GET' &&  req.path === '/blog/detail')  {
    const { id } = req.query; 
    if (!id) {
      return new ErrorModel('请输入必需填写的参数');
    }

    const list = await findBlogById(id);
    if (list.length > 0) {
      return new SuccessModel(list[0]);
    } else {
      return new ErrorModel('请输入正确的id！');
    }
  }

  if (req.method === 'POST' &&  req.path === '/blog/add')  {
    const { u_id, title, content } = req.body;

    if (!u_id || !title || !content) {
      return new ErrorModel('请输入必需填写的参数');
    }
    const result = await addBlog(u_id, title, content, req.session.username);
    if (result.affectedRows === 1 && result.warningCount === 0) {
      return new SuccessModel(true);
    } else {
      return new ErrorModel('博客发布失败！');
    }
  }

  if (req.method === 'PUT' &&  req.path === '/blog/update') {
    const { id, title, content } = req.body;
    if (!id || !title || !content) {
      return new ErrorModel('请输入必需填写的参数');
    }
    const result = await updateBlog(req.session.id, id, title, content);
    if (result.affectedRows === 1 && result.warningCount === 0) {
      return new SuccessModel(result);
    } else {
      return new ErrorModel('博客修改失败！');
    }
  }

  if (req.method === 'DELETE' &&  req.path === '/blog/del') {
    const { id } = req.query;
    if (!id) {
      return new ErrorModel('请输入必需填写的参数');
    }
    const result = await deleteBlog(id);
    if (result.affectedRows === 1 && result.warningCount === 0) {
      return new SuccessModel(result);
    } else {
      return new ErrorModel('博客删除失败！');
    }
  }


};

module.exports = {
  blogRouteHandle
};
