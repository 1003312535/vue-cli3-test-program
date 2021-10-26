
const routes = [
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

export default routes