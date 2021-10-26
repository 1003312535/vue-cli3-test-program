// index中的getter
export default {
  isCollapse: (state) => state.common.isCollapse, //是否折叠
  isFullScreen: (state) => state.common.isFullScreen, //是否全屏
  isWaterMark: (state) => state.common.isWaterMark, //是否全屏
  menuTagList: (state) => state.tag.menuTagList, //菜单tab列表
  currentTag: (state) => state.tag.currentTag, //菜单tab列表
};