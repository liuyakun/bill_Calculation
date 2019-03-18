/**
 *  描述：Global filters js
 */

// 待安装
const install = Vue => {
    // 适配终端
    Vue.filter('userType', function (value) {
      switch (value) {
        case 0:
          return '普通用户';
        case 1:
          return '超级管理员';
      }
    });
};

export default install;
