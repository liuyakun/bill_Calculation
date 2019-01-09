/**
 * 描述：日志管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const pageListApi = '/api/plat/commission/queryPageableData/{page}/{limit}';          // 分页列表              method 'get'
const modifyApi = '/api/plat/commission/queryPageableData/modify';                    // 修改                  method 'post'

// 分页列表
export const findOperatePageList = (opt, payload) => fetch.post(apiFormat(pageListApi, opt), payload);

// 修改
export const modifyFun = (payload) => fetch.post(modifyApi, payload);
