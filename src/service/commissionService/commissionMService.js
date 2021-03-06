/**
 * 描述：日志管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const pageListApi = '/api/plat/commission/queryPageableData/{page}/{limit}';                       // 分页列表              method 'get'
const defaultCommissionListApi = '/api/plat/commission/queryDefaultCommission/{page}/{limit}';     // 默认佣金分页列表      method 'get'
const modifyApi = '/api/plat/commission/modify';                                                   // 修改                  method 'post'

// 分页列表
export const findOperatePageList = (opt, payload) => fetch.post(apiFormat(pageListApi, opt), payload);

// 默认佣金分页列表
export const defaultCommissionList = (opt, payload) => fetch.get(apiFormat(defaultCommissionListApi, opt));

// 修改
export const modifyFun = (payload) => fetch.post(modifyApi, payload);
