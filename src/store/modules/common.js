import { getStore, setStore } from '../../utils/store';
export default {
  state: {
    isCollapse: getStore({ name: 'isCollapse' }) || false, //是否全屏
    isFullScreen: false, //是否全屏
    isWaterMark: getStore({ name: 'isWaterMark' }) || false, //是否显示水印
  },
  mutations: {
    SET_FULLSCREEN(state) {
      //设置是否全屏
      state.isFullScreen = !state.isFullScreen;
      // console.log(state.isFullScreen);
      // setStore({ name: 'isFullScreen', content: state.isFullScreen, type: 'session' });
    },
    SET_WATERMARK(state) {
      //设置是否全屏
      state.isWaterMark = !state.isWaterMark;
      setStore({ name: 'isWaterMark', content: state.isWaterMark, type: 'session' });
    },
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      setStore({ name: 'isCollapse', content: state.isCollapse, type: 'session' });
    },
  },
  actions: {},
};
