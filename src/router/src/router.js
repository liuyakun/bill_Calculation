/**
 * 描述：路由文件
 */
import App from '../../App';
import _import from './_import.js';

// 404
const _404 = _import('404/404');

// login
const login = _import('login/login');

// main
const main = _import('main/main');

const home = _import('main/home/home');
const business = _import('main/business/index');
const businessCommission = _import('main/business/commission/index');
const defaultCommission = _import('main/defaultCommission/index');
const businessTask = _import('main/business/task/index');
const code = _import('main/code/index');
const introducer = _import('main/introducer/index');
const userManage = _import('main/userManage/index');

export default [
  // 未匹配到则404页面
  {
    path: '*',
    component: _404
  },
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect: '/login'
      },
      {
        path: '404',
        component: _404
      },
      {
        path: '/login',
        component: login
      },
      {
        path: 'main',
        component: main,
        children: [
          {path: 'home', component: home},
          {path: 'business', component: business},
          {path: 'business/commission', component: businessCommission},
          {path: 'business/task', component: businessTask},
          {path: 'code', component: code},
          {path: 'introducer', component: introducer},
          {path: 'userManage', component: userManage},
          {path: 'defaultCommission', component: defaultCommission}
        ]
      }
    ]
  }
];
