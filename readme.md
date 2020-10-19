<!--
 * @Author: tangzhicheng
 * @Date: 2020-10-19 23:05:10
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-10-19 23:17:14
 * @Description: file content
-->
# api 文档

## 用户模块

|  功能  | 地址  | 参数 | 请求方式 |
|  ----  | ----  | ---- | ---- |
| 登录  | /user/login | username, password | post |
| 注册  | /user/register | username, password, author | post |



## 博客模块

|  功能  | 地址  | 参数 | 请求方式 |
|  ----  | ----  | ---- | ---- |
| 获取博客列表  | /blog/list | keyword | get |
| 获取博客详情  | /blog/detail | b_id | get |
| 发表博客  | /blog/add | u_id, title, content  | post |
| 修改博客  | /blog/update | u_id, b_id, title, content  | put |
| 删除博客  | /blog/detail | u_id, b_id | delete |

