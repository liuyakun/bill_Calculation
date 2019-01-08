/**
 * 描述：应用管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const downPageListApi = '/api/appstore/app/store/findDownLoadPageList/{page}/{limit}';         // 分页查询可下载APP应用    method 'post'
const addApi = '/api/appstore/app/store/add';                                                  // 应用新增                 method 'post'
const deleteApi = '/api/appstore/app/store/delete/{id}';                                       // 应用删除                 method 'post'
const historyPageListApi = '/api/appstore/app/store/findHistoryPageList/{id}/{page}/{limit}';  // 分页查询APP应用历史版本  method 'post'
const updateApi = '/api/appstore/app/store/update';                                            // 修改新增                 method 'post'
const pageListApi = '/api/appstore/app/store/findPageList/{page}/{limit}';                     // 分页查询APP应用          method 'post'
const storeByIdApi = '/api/appstore/app/store/{id}';                                           // 查询APP应用详情          method 'post'
const publishApi = '/api/appstore/app/store/publish/{id}';                                     // 发布APP应用              method 'post'
const offlineApi = '/api/appstore/app/store/offline/{id}';                                     // 下线APP应用              method 'post'
const upgradeApi = '/api/appstore/app/store/upgrade';                                          // 升级APP应用              method 'post'

// 分页查询可下载APP应用
export const downPageList = (opt, payload) => fetch.post(apiFormat(downPageListApi, opt), payload);

// 应用新增
export const addStore = (payload) => fetch.post(addApi, payload);

// 应用删除
export const deleteStore = (opt) => fetch.post(apiFormat(deleteApi, opt));

// 应用修改
export const updateStore = (payload) => fetch.post(updateApi, payload);

// 分页查询APP应用历史版本
export const historyPageList = (opt, payload) => fetch.post(apiFormat(historyPageListApi, opt), payload);

// 分页查询APP应用
export const pageList = (opt, payload) => fetch.post(apiFormat(pageListApi, opt), payload);

// 查询APP应用详情
export const storeById = (opt) => fetch.get(apiFormat(storeByIdApi, opt));

// 发布APP应用
export const publish = (opt) => fetch.post(apiFormat(publishApi, opt));

// 下线APP应用
export const offline = (opt) => fetch.post(apiFormat(offlineApi, opt));

// 升级APP应用
export const upgrade = (payload) => fetch.post(upgradeApi, payload);
