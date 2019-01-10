/**
 * 描述：日志管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const pageListApi = '/api/plat/cardManagement/queryPageableData/{page}/{limit}';          // 分页列表              method 'get'
const addApi = '/api/plat/cardManagement/create';                          // 新增                  method 'post'
const modifyApi = '/api/plat/cardManagement/modify';                    // 修改                  method 'post'
const deleteApi = '/api/plat/cardManagement/del';                       // 删除                  method 'delete'
const codeSelectListApi = '/api/plat/cardManagement/queryPageableData/1/100';          // 下拉列表              method 'get'

// 分页列表
export const findOperatePageList = (opt, para) => fetch.post(apiFormat(pageListApi, opt));

// 新增
export const addFun = (payload) => fetch.post(addApi, payload);

// 修改
export const modifyFun = (payload) => fetch.post(modifyApi, payload);

// 修改
export const deleteFun = (para) => fetch.delete(deleteApi, {params: para});

// 修改
export const codeSelectList = (para) => fetch.post(codeSelectListApi);
