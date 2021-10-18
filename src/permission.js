import store from '@/store';
import router from '@/router';

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
NProgress.configure({ showSpinner: false });

//路由守卫
router.beforeEach(to, from, next) {

}