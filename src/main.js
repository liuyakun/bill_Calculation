/**
 * 描述：入口文件
 */
import Vue from 'vue';
import router from './router/';
import Element from 'element-ui';
import store from './store/';
import core from '@/js/core';       // 公共指令及filter
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;
Vue.use(Element);
Vue.use(core);
Vue.use(iView);

/* eslint-disable no-new */
new Vue({
	router,
	store
}).$mount('#app');
