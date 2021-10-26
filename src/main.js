import Vue from 'vue';
import App from './App.vue';
import router from './router';

//权限配置
import './permission'; // 权限


Vue.config.productionTip = false;
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
//avue
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
Vue.use(Avue);
//动画：https://www.dowebok.com/demo/2014/98/
import '../public/animate/animate.min.css'
//vuex 挂载
import store from '@/store';

//变量样式
// import './styles/variate.scss'

//样式
import './styles/index.scss';
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
