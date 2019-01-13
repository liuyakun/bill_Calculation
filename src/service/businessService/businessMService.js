/**
 * 描述：日志管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const pageListApi = '/api/plat/business/queryPageableData/{page}/{limit}';          // 分页列表              method 'get'
const importApi = '/api/plat/task/import';          // 导入任务信息              method 'post'
const modifyApi = '/api/plat/business/modify';                    // 修改                  method 'post'
const deleteApi = '/api/plat/business/del';                    // 删除                  method 'post'

// 分页列表
export const findOperatePageList = (opt, para) => fetch.post(apiFormat(pageListApi, opt), {params: para});

// 导入任务信息
export const importTask = (payload) => fetch.post(importApi, payload);

// 修改
export const modifyFun = (payload) => fetch.post(modifyApi, payload);

// 删除
export const deleteFun = (para) => fetch.delete(deleteApi, {params: para});
