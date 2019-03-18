/**
 * 描述：http
 */
import axios from 'axios';
import {Notice, LoadingBar} from 'iview';
import _hyTool from '@/js/core/utils/tool';                               	 // 全局方法

axios.defaults.timeout = 3000;

// 拦截
axios.interceptors.request.use(function (config) {
  LoadingBar.start();
  if (_hyTool.getStore('token')) config.headers['X-Auth-Token'] = _hyTool.getStore('token');
  return config;
}, function (error) {
  Notice.warning({title: '加载超时'});
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  LoadingBar.finish();
  return Promise.resolve(response.data);
}, function (error) {
  LoadingBar.finish();
    if (error.response) {
        switch (error.response.status) {
            case 401:
              Notice.warning({title: '登录超时， 请重新登录！'});
                break;
            case 404:
                return Promise.reject('当前api未找到，错误代码：404');
            case 500:
                return Promise.reject('未知原因，错误代码：500');
        }
    }
    return Promise.reject(error);
});

export default axios;
