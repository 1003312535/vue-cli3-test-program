<!-- 菜单tag导航标签 -->
<template>
  <div class="layout_tag">
    <el-tabs v-model="menuTagName" type="card" @tab-remove="handleTabsEdit" @tab-click="tabClick" @contextmenu.prevent.native="showTagControlTool">
      <template v-for="(item, index) in menuTagList">
        <el-tab-pane :key="item.path" :label="item.name" :name="item.path" :closable="!item.closable">
          {{item.path}}
        </el-tab-pane>
      </template>
    </el-tabs>
    <div v-if="showMenuControl" class="tagControlBox" :style="{left:setPx(contentmenuX),top:setPx(contentmenuY)}">
      <div class="item" @click="closeOthersTags">关闭其它</div>
      <div class="item" @click="closeAllTags">关闭所有</div>
      <div class="item" @click="closeCancel">取消</div>
    </div>
    <div v-show="showMask" class="mask" @mousedown="cancelMaskClick"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      menuTagName: "第一项", //tab选中的名称 name
      showMenuControl: false,
      showMask: false,//遮罩切换
      contentmenuX: "",
      contentmenuY: "",
    }
  },
  computed: {
    ...mapGetters(["menuTagList", "currentTag"]),
  },
  watch: {
    currentTag: {
      handler(value) {
        this.menuTagName = this.currentTag.path
      },
      deep: true,
    },
    showMenuControl(value) {
      this.showMask = value
    }
  },
  methods: {
    //点击遮罩
    cancelMaskClick() {
      /**通过监听 showMenuControl 点击遮罩 隐藏closeOthersTags， 隐藏遮罩 */
      this.showMenuControl = false
    },
    //关闭其它
    closeOthersTags() {
      this.$store.commit('CloseOthersTags')
      this.showMenuControl = false
    }, 
    //关闭所有
    closeAllTags() {
      this.$store.commit('CloseAllTags')
      this.showMenuControl = false
    }, 
    //取消
    closeCancel() {
      this.showMenuControl = false
    },
    //控制鼠标右键
    showTagControlTool(e) {
      console.log(e, "e---")
      e = e || window.event
      var scrollX =
        document.documentElement.scrollLeft || document.body.scrollLeft
      var scrollY =
        document.documentElement.scrollTop || document.body.scrollTop
      this.contentmenuX = e.pageX || e.clientX + scrollX
      this.contentmenuY = e.pageY || e.clientY + scrollY
      this.showMenuControl = true
      this.showMask = true
    },
    //tab 被关闭事件
    handleTabsEdit(targetName) {
      this.$store.commit("DEL_TAG", [targetName])
    },
    //点击选中事件
    tabClick(value) {
      let filterValue = this.menuTagList.filter((item) => {
        return item.path == value.name
      })
      console.log(value, filterValue)
      if (
        filterValue &&
        filterValue[0] &&
        filterValue[0].path != this.currentTag.path
      ) {
        this.$router.replace({
          path: filterValue[0].path,
        })
      }
    },
  },
  mounted() {
    this.menuTagName = this.currentTag.path
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/layout/tag.scss";
</style>