/**
 * 描述：定义states
 */

export default {
  // 全局公共部分
  page: 1,                                   // 当前页
  totalElement: 0,                              // 总数
  limit: 10,                                  // 分页数
  modalTransition: 'bounceLeft',              // 弹出动画
  modalTransition2: 'bounceDown',              // 弹出动画
  modalTransition3: 'rotate',              // 弹出动画
  userInfo: {},                                 // 用户信息
  isLogin: true,                                // 是否登录
  carList: [],                                  // 所有车辆列表
  menuTreeList: [],                             // 菜单
  sidebar_an: false,                            // 控制导航
  imgFormat: ['png', 'jpeg', 'jpg'],            // 上传图片格式
  imgSize: '2M',                                // 上传图片大小
  // 电子围栏绘制样式
  baseDraw: {
    strokeColor: '#5D87AF',
    strokeOpacity: 1,
    strokeWeight: 1,
    fillColor: '#5D87AF',
    fillOpacity: 0.3
  },
  dateOptions3: {
    disabledDate (date) {
      return date && date.valueOf() < Date.now() - 86400000;
    }
  }
};
