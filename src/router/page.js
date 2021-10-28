// 配置单独页面----跳转最外层的路由
const routes = [
  {
    path: '/login',
    name: '登录',
    meta: {
      showtab: false,
    },
    component: () => import(/* webpackChunkName: "about" */ '../page/login/index.vue'),
  },
  {
    path: '/404',
    name: '页面不存在',

    meta: {
      showtab: false,
    },
    component: () => import(/* webpackChunkName: "about" */ '../components/HelloWorld.vue'),
  },
  {
    path: '*',
    redirect: '/404',
  },
];

export default routes;
