/**
 * 描述：日志管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const pageListApi = '/api/plat/business/queryPageableData/{page}/{limit}';          // 分页列表              method 'get'
const importApi = '/api/plat/task/import';          // 导入任务信息              method 'post'

// 分页列表
export const findOperatePageList = (opt, para) => fetch.get(apiFormat(pageListApi, opt), {params: para});

// 导入任务信息
export const importTask = (payload) => fetch.post(importApi, payload);
