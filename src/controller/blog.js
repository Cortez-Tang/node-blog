/**
 * @Author: tangzhicheng
 * @Date: 2020-10-22 23:05:48
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-11-04 13:57:42
 * @Description: 博客控制层
 */

const { exec } = require('../db/mysql');

/**
 * 查询所有博客
 * @param {*} keyword 
 * @param {*} page 
 * @param {*} size 
 * @param {*} u_id
 */
const searchBlogs = async (keyword, page, size , u_id) => {
  const _size = size || 10;
  const startIndex = (page - 1) * size;

  let sql = `select * from blogs where state=1 and (title like '%${keyword}%' or content like '%${keyword}%' or username like '%${keyword}%')`;

  if (u_id) {
    sql += ` and u_id=${u_id}`;
  }

  sql += ` order by createtime desc limit ${startIndex}, ${_size};`
  
  const list = await exec(sql);
  return list;
};

/**
 * 精准查询
 * @param {*} id 
 */
const findBlogById = async (id) => {
  const sql = `select * from blogs where state=1 and id=${id};`
  const list = await exec(sql);
  return list;
};

/**
 * 新增一条博客
 * @param {*} u_id 
 * @param {*} title 
 * @param {*} content 
 */
const addBlog = async (u_id, title, content, username) => {
  const sql = `insert into blogs (u_id, title, content, username, createtime) values (${u_id}, '${title}', '${content}', '${username}', ${Date.now()});`;
  const result = await exec(sql);
  return result;
};

/**
 * 修改一条博客数据
 * @param {*} id 
 * @param {*} title 
 * @param {*} content 
 * @param {*} u_id
 */
const updateBlog = async (u_id, id, title, content) => {
  const sql = `update blogs set title='${title}', content='${content}' where id=${id} and u_id=${u_id};`;
  const result = await exec(sql);
  return result;
};

/**
 * 删除博客
 * @param {*} id 
 */
const deleteBlog = async (id) => {
  const sql = `update blogs set state=0 where id=${id};`
  const result = await exec(sql);
  return result;
};

module.exports = {
  searchBlogs,
  addBlog,
  findBlogById,
  updateBlog,
  deleteBlog
};
