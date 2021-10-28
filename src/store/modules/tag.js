// menuTab存储库
import website from '@/config/website';
import { getStore, setStore } from '@/utils/store';
import router from '@/router';
//默认选中的tab
const defaultTab = {
  label: '', //标题名称
  value: '', //标题的路径
  params: '', //标题的路径参数
  query: '', //标题的参数
  meta: {}, //额外参数
  group: [], //分组
};

//通过tab对象得 closable 设置 首页无法关闭问题
function setFirstPage(payload) {}

export default {
  state: {
    menuTagList: getStore({ name: 'menuTagList' }) || [website.firstPage], //默认首页
    currentTag: getStore({ name: 'tag' }) || website.firstPage, //当前选中的menu对象
  },
  mutations: {
    //新增
    ADD_TAG(state, payload) {
      state.menuTagList.push(payload);
      state.currentTag = payload;
      setStore({ name: 'menuTagList', content: state.menuTagList, type: 'session' });
      setStore({ name: 'currentTag', content: state.currentTag, type: 'session' });
    },
    //跳转到
    CHANGE_TAG(state, payload) {
      state.currentTag = payload;
      setStore({ name: 'currentTag', content: state.currentTag, type: 'session' });
      console.log(state.menuTagList, 'menuTagListmenuTagListmenuTagListmenuTagList');
    },
    //删除
    DEL_TAG(state, payload) {
      payload.forEach((path) => {
        //如果删除当前标签时
        if (state.currentTag.path === path) {
          //找到它的下标把指针指向左右两边得标签
          state.menuTagList.forEach((tabs, index) => {
            if (tabs.path === path) {
              let nextTab = state.menuTagList[index + 1] || state.menuTagList[index - 1];
              if (nextTab) {
                router.replace({
                  path: nextTab.path,
                });
              }
            }
          });
        }
        state.menuTagList = state.menuTagList.filter((item, index) => {
          if (index == 0) {
            return true;
          } else {
            return item.path != path;
          }
        });
      });
      setStore({ name: 'menuTagList', content: state.menuTagList, type: 'session' });
      setStore({ name: 'currentTag', content: state.currentTag, type: 'session' });
    },
    //关闭其他
    CloseOthersTags(state, payload) {
      state.menuTagList = state.menuTagList.filter((item, index) => {
        console.log(item, 'items');
        if (index == 0 || item.path == state.currentTag.path) {
          return true;
        } else {
          false;
        }
      });
      setStore({ name: 'menuTagList', content: state.menuTagList, type: 'session' });
    },
    //关闭所有
    CloseAllTags(state, payload) {
      /**过滤只留下首页，然后跳转路由到首页 */
      state.menuTagList = state.menuTagList.filter((item, index) => {
        if (index == 0) {
          return true;
        } else {
          false;
        }
      });
      setStore({ name: 'menuTagList', content: state.menuTagList, type: 'session' });
      router.replace({path: state.menuTagList[0].path});
    }
  },
};
