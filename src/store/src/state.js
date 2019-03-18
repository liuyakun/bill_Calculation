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
  dateOptions3: {
    disabledDate (date) {
      return date && date.valueOf() < Date.now() - 86400000;
    }
  }
};
