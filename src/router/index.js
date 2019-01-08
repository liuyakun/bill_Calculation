/**
 * 描述：路由文件
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './src/router.js';

Vue.use(VueRouter);

const router = new VueRouter({
    // mode: 'history',
    routes,
    strict: process.env.NODE_ENV !== 'production'
});

// 路由未登录拦截
router.beforeEach((to, from, next) => {
  next();
});

export default router;
