/**
 * 描述：日志管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const pageListApi = '/api/plat/detail/queryPageableData/{page}/{limit}';          // 分页列表              method 'get'
const pageListApi2 = '/api/plat/detail/queryPageableData/{page}/{limit}';         // 分页列表              method 'get'
const modifyApi = '/api/plat/detail/modify';                                      // 修改                  method 'post'
const getSummaryApi = '/api/plat/summary/queryPageableData/1/15';                 // 每日汇总              method 'post'

// 分页列表
export const findOperatePageList = (opt, payload) => fetch.post(apiFormat(pageListApi, opt), payload);
export const findOperatePageList2 = (opt, payload) => fetch.post(apiFormat(pageListApi2, opt), payload);

// 修改
export const modifyFun = (payload) => fetch.post(modifyApi, payload);

// 修改
export const getSummary = (payload) => fetch.post(getSummaryApi, payload);
