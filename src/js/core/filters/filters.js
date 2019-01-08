/**
 *  描述：Global filters js
 */
import tool from '@/js/core/utils/tool';

// 待安装
const install = Vue => {
    // 时间filter
    Vue.filter('formatDate', function (value) {
        if (!value) return '---';
        let val = new Date(+value);
        return tool.DateFormat(val, 'yyyy-MM-dd');
    });

    // 时间filter
    Vue.filter('formatTime', function (value) {
        if (!value) return '---';
        let val = new Date(+value);
        return tool.DateFormat(val, 'yyyy-MM-dd hh:mm:ss');
    });
    // 适配终端
    Vue.filter('adapterType', function (value) {
      switch (value) {
        case 1:
          return '手机端';
        case 2:
          return '车机端';
      }
    });
    // 适配终端
    Vue.filter('appStateType', function (value) {
      switch (value) {
        case 1:
          return '已上传';
        case 2:
          return '已发布';
        case 3:
          return '已下线';
      }
    });
};

export default install;
