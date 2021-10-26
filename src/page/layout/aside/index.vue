<!--侧边菜单栏-->
<template>
  <div class="layout_aside" :class="isCollapse? 'isCollapseBox':''">
    <el-scrollbar ref="scrollMenuRef" class="scrollMenuBox">
      <el-menu :collapse-transition="false" :collapse="isCollapse" :router="true" :default-active="currentTag.name">
        <menu-item v-for="(item,index) in menuList" :key="item.path" :menuItem="item"></menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import menuItem from "./menuItem.vue"
export default {
  components: { menuItem },
  data() {
    return { menuList: [] }
  },
  computed: {
    ...mapGetters(["isCollapse",'currentTag']),
  },
  mounted() {
    this.menuList = this.$store.state.user.menuList
    console.log(this.menuList,'this.menuList')
  },
}
</script>

<style scoped lang="scss">
/*隐藏水平滚动条*/
/deep/ .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>