/**权限配置 */
import store from '@/store';
import router from '@/router';
import website from './config/website';
import { deepClone } from '@/utils/util';
import { getToken } from '@/utils/auth';
import { validatenull } from '@/utils/validate';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
NProgress.configure({ showSpinner: false });

// 定义空menutab
const emptyPage = { name: '', path: '', params: {}, query: {}, meta: { keepAlive: true }, group: [], closable: false }; //true: 不可关闭，false：可关闭

//路由守卫
router.beforeEach((to, from, next) => {


  //是否有token
  console.log(getToken(),'getToken')
  if(getToken()) {

  }else{//token不存在
    // 判断该路由是否认证
    if(to.meta.isAuth) {
      next('/login')
    }else{
      next()
    }
  }
  //查看
  setTagList(to); //设置 菜单标签功能

  next();
});

/**设置 菜单标签功能 */
function setTagList(to) {
  console.log(to, 'to------------------');
  // 不能直接把to 传过去，否则会形成 将循环结构转换为JSON 报错
  const routePage = JSON.parse(JSON.stringify(emptyPage)); //初始化个 路由对象
  routePage.name = to.name;
  routePage.path = to.path;
  let currentTab =
    store.getters.menuTagList.filter((item) => {
      return item.path == to.path;
    }) || [];
  if (currentTab.length != 0) {
    //如果该路由存在
    // if (currentTab[0].path == website.firstPage.path) return; //如果跳转得是首页就不操作
    store.commit('CHANGE_TAG', currentTab[0]); //改
  } else {
    if (!validatenull(to.name) && to.meta.showtab !== false) {
      store.commit('ADD_TAG', routePage); //增
    }
  }
}
