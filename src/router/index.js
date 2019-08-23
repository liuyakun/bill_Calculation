/**
 * 描述：路由文件
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './src/router.js';
import iView from 'iview';

Vue.use(VueRouter);

const router = new VueRouter({
    // mode: 'history',
    routes,
    strict: process.env.NODE_ENV !== 'production'
});

// 路由未登录拦截
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  let info = Vue._hyTool.getStore('token');
  if (to.path !== '/login' && !info) {
    next({path: '/login'});
  } else {
    next();
  }
});
router.afterEach(route => {
  iView.LoadingBar.finish();
});

export default router;
