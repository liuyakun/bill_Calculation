/**
 * 描述：登录&用户管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const loginApi = '/api/plat/login';                                             // 登录              method 'post'
const userListApi = '/api/plat/user/queryPageableData/{page}/{limit}';          // 用户列表          method 'post'
const userAddApi = '/api/plat/user/create';                                     // 增加              method 'post'
const userByIdApi = '/api/plat/user/byId';                                      // 详情              method 'get'
const userUpdateApi = '/api/plat/user/modify';                                  // 修改              method 'post'
const userDelApi = '/api/plat/user/del';                                        // 删除              method 'delete'
const resetPwdApi = '/api/plat/user/resetPwd';                                  // 重置密码          method 'delete'

// 登录
export const loginFun = (payload) => fetch.post(loginApi, payload);

// 分页列表
export const userList = (opt, payload) => fetch.post(apiFormat(userListApi, opt), payload);

// 增加
export const userAdd = (payload) => fetch.post(userAddApi, payload);

// 详情
export const userById = (para) => fetch.get(userByIdApi, {params: para});

// 修改
export const userUpdate = (payload) => fetch.post(userUpdateApi, payload);

// 删除
export const userDel = (para) => fetch.delete(userDelApi, {params: para});

// 重置密码
export const resetPwd = (para) => fetch.delete(resetPwdApi, {params: para});
