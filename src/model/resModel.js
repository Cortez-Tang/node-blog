/**
 * @Author: tangzhicheng
 * @Date: 2020-10-22 22:06:25
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2020-10-22 22:22:14
 * @Description: file content
 */

class BaseModel {
  constructor(code) {
    this.code = code;
  }
}


class SuccessModel extends BaseModel {
  constructor(data, msg) {
    super(0);
    this.data = data;
    this.msg = msg || '';
  }
}


class ErrorModel extends BaseModel {
  constructor(data, msg) {
    super(-1);
    if (!msg) {
      this.data = null;
      this.msg = data;
    } else {
      this.data = data;
      this.msg;
    }
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
};