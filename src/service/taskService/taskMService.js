/**
 * 描述：日志管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const pageListApi = '/api/plat/task/queryPageableData/{page}/{limit}';          // 分页列表              method 'get'

// 分页列表
export const findOperatePageList = (opt, payload) => fetch.post(apiFormat(pageListApi, opt), payload);
