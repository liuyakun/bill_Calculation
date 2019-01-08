/**
 *  描述：基于vue的扩展
 */
import '@/js/libs/animate';
import _hyTool from '@/js/core/utils/tool';                               	 // 全局方法
import _hyDirectives from '@/js/core/directives/directives';              	 // 全局指令文件
import _hyFilters from '@/js/core/filters/filters';                       	 // 全局过滤文件
import __filters from '@/js/core/filters/i_filters';                       	 // 全局过滤文件
import hyPage from '@/components/pageServices/pageServices';          // 分页组件

const install = function (Vue, options = {}) {
	// 静态方法
	if (install.installed) return;
	install.installed = true;
	// 全局方法
	Vue.prototype._hyTool = Vue._hyTool = Vue.prototype._hyTool || _hyTool;
	// 指令
	Vue.use(_hyDirectives);
	// 过滤ue.com
	Vue.use(_hyFilters);
  // iview table字段过滤
  Vue.use(__filters);
  // 组件
  Vue.component('hyPage', hyPage);
};

// 工具类
const core = {
	install
};

/**
 * 自动安装控件
 */
let GlobalVue = null;
if (window.Vue !== undefined) {
	GlobalVue = window.Vue;
} else if (global.Vue !== undefined) {
	GlobalVue = global.Vue;
}

if (GlobalVue) {
	GlobalVue.use(core);
}

export default core;
