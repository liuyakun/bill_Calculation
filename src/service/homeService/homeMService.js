/**
 * 描述：日志管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const pageListApi = '/api/plat/detail/queryPageableData/{page}/{limit}';          // 分页列表              method 'get'
const pageListApi2 = '/api/plat/detail/queryPageableData/{page}/{limit}';         // 分页列表              method 'get'
const initSummaryApi = '/api/plat/summary/initSummary';                           // 生成第二天汇总列表    method 'get'
const modifyApi = '/api/plat/detail/modify';                                      // 修改                  method 'post'
const modifySummaryApi = '/api/plat/summary/modify';                              // 修改汇总              method 'post'
const getSummaryApi = '/api/plat/summary/queryPageableData/{page}/{limit}';       // 每日汇总              method 'post'
const getReferrerCollectApi = '/api/plat/summary/getReferrerCollect';             // 介绍人汇总            method 'post'
const getCardCollectApi = '/api/plat/summary/getCardCollect';                     // 卡号汇总              method 'post'

// 分页列表
export const findOperatePageList = (opt, payload) => fetch.post(apiFormat(pageListApi, opt), payload);
export const findOperatePageList2 = (opt, payload) => fetch.post(apiFormat(pageListApi2, opt), payload);

// 生成第二天汇总列表
export const initSummary = (opt, payload) => fetch.get(initSummaryApi);

// 修改
export const modifyFun = (payload) => fetch.post(modifyApi, payload);

// 每日汇总
export const getSummary = (opt, payload) => fetch.post(apiFormat(getSummaryApi, opt), payload);

// 修改汇总
export const modifySummary = (payload) => fetch.post(modifySummaryApi, payload);

// 介绍人汇总
export const getReferrerCollect = (payload) => fetch.post(getReferrerCollectApi, payload);

// 每日汇总
export const getCardCollect = (payload) => fetch.post(getCardCollectApi, payload);
