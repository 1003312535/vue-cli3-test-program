import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Layout from '@/page/layout';
import errorPage from './page';//错误页面
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/RenNing/index',
  },
  {
    path: '/RenNing',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '首页',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      },
      {
        path: 'ceshi',
        name: '测试',
        component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
      },
    ],
  },
  ...errorPage,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
