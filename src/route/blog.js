/**
 * @Author: tangzhicheng
 * @Date: 2020-10-22 21:57:44
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-10-22 23:03:30
 * @Description: 博客路由
 */

const { SuccessModel, ErrorModel } = require('../model/resModel');


const blogRouteHandle = (req, res) => {
  if (req.method === 'GET' &&  req.path === '/blog/list')  {
    return new SuccessModel(
      {
        list: [
          {
            id: 1,
            author: '唐志诚',
            title: '标题1',
            content: '收到好久好久是的黄金时代回家快回家啊收到好久',
            createtime: Date.now()
          }
        ],
        page: 1,
        size: 1,
        total: 1
      }
    );
  }

  if (req.method === 'GET' &&  req.path === '/blog/detail')  {
    return new SuccessModel({
      id: 1,
      author: '唐志诚',
      title: '标题1',
      content: '收到好久好久是的黄金时代回家快回家啊收到好久',
      createtime: Date.now()
    });
  }

  if (req.method === 'POST' &&  req.path === '/blog/add')  {
    return new SuccessModel(true);
  }

  if (req.method === 'PUT' &&  req.path === '/blog/update')  {
    console.log(req.body);
    return new SuccessModel(true);
  }

  if (req.method === 'DELETE' &&  req.path === '/blog/del')  {
    return new SuccessModel(true);
  }


};

module.exports = {
  blogRouteHandle
};
