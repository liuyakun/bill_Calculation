/**
 * 描述：用户、登录管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const userPageListApi = '/api/appstore/app/user/findPageList/{page}/{limit}';          // 分页查询用户模块    method 'post'
const loginApi = '/api/appstore/app/user/login';                                       // 用户登录            method 'post'
const logoutApi = '/api/appstore/app/user/logout';                                     // 用户登出            method 'post'
const modifyPasswordApi = '/api/appstore/app/user/modifyPassword';                     // 修改密码            method 'post'
const resetPasswordApi = '/api/appstore/app/user/resetPassword';                       // 重置密码            method 'post'
const updateUserApi = '/api/appstore/app/user/update';                                 // 修改用户            method 'post'
const userByIdApi = '/api/appstore/app/user/{id}';                                     // 查询用户详情        method 'GET'
const userByTokenApi = '/api/appstore/app/user/findByToken';                           // 查询用户详情        method 'GET'

// 分页列表
export const userPageList = (opt, payload) => fetch.post(apiFormat(userPageListApi, opt), payload);

// 用户登录
export const userLogin = (opt) => fetch.post(loginApi, null, {params: opt});

// 用户登出
export const userLogout = (payload) => fetch.post(logoutApi, payload);

// 修改密码
export const modifyPassword = (opt) => fetch.post(modifyPasswordApi, null, {params: opt});

// 重置密码
export const resetPassword = (opt) => fetch.post(resetPasswordApi, null, {params: opt});

// 修改用户
export const updateUser = (payload) => fetch.post(updateUserApi, payload);

// 查询用户详情(id)
export const userById = (opt) => fetch.get(apiFormat(userByIdApi, opt));

// 查询用户详情(token)
export const userByToken = (opt) => fetch.get(userByTokenApi);
