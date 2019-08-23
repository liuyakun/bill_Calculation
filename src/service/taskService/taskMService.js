/**
 * 描述：日志管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const pageListApi = '/api/plat/task/queryPageableData/{page}/{limit}';          // 分页列表              method 'get'
const taskDelsApi = '/api/plat/task/dels';          // 批量删除任务信息              method 'delete'

// 分页列表
export const findOperatePageList = (opt, payload) => fetch.post(apiFormat(pageListApi, opt), payload);

// 批量删除任务信息
export const deleteFun = (para) => fetch.delete(taskDelsApi, {params: para});
