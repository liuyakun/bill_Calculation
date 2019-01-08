/**
 *  描述：Global filters js
 */
// import tool from '@/js/core/utils/tool';

// 待安装
const install = (Vue, options) => {
  Vue.prototype.__filters = {
    // 性别
    adapterType: (h, params, key) => {
      let strInfo = '';
      let cssType = '';
      if (!params.row[key]) {
        return '';
      }
      switch (params.row[key].toString()) {
        case '1':
          strInfo = '手机端';
          break;
        case '2':
          strInfo = '车机端';
          break;
      }
      return h('p', {
        style: {
          color: cssType,
          marginRight: '5px'
        }
      }, strInfo);
    }
  };
};

export default install;
