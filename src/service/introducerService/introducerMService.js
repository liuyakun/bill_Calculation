/**
 * 描述：日志管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const pageListApi = '/api/plat/commission/queryPageableData/{page}/{limit}';          // 分页列表              method 'get'
const addApi = '/api/plat/commission/queryPageableData/add';                          // 新增                  method 'post'
const modifyApi = '/api/plat/commission/queryPageableData/modify';                    // 修改                  method 'post'
const deleteApi = '/api/plat/commission/queryPageableData/del';                       // 删除                  method 'delete'

// 分页列表
export const findOperatePageList = (opt, para) => fetch.get(apiFormat(pageListApi, opt), {params: para});

// 新增
export const addFun = (payload) => fetch.post(addApi, payload);

// 修改
export const modifyFun = (payload) => fetch.post(modifyApi, payload);

// 修改
export const deleteFun = (para) => fetch.delete(deleteApi, {params: para});
