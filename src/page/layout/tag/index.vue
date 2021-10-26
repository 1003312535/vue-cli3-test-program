<!-- 菜单tab导航标签 -->
<template>
  <div class="layout_tag">
    <el-tabs v-model="menuTagName" type="card" @tab-remove="handleTabsEdit" @tab-click="tabClick">
      <template v-for="(item, index) in menuTagList">
        <el-tab-pane :key="item.path"  :label="item.name" :name="item.path" :closable="!item.closable" >
          {{item.path}}
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      menuTagName: "第一项", //tab选中的名称 name
    }
  },
  computed: {
    ...mapGetters(["menuTagList",'currentTag']),
  },
  watch: {
    currentTag: {
      handler(value) {
        this.menuTagName = this.currentTag.path
      },
      deep: true
    }
  },
  methods: {
    //tab 被关闭事件
    handleTabsEdit(targetName) {
      this.$store.commit('DEL_TAG',[targetName])
    },
    //点击选中事件
    tabClick(value) {
      let filterValue = this.menuTagList.filter(item => {
        return item.path == value.name
      })
      console.log(value, filterValue,'---------------------22222222222222222---------------------------------')
      if(filterValue && filterValue[0] && filterValue[0].path != this.currentTag.path) {
        this.$router.replace({
          path: filterValue[0].path
        })
      }
    }
  },
  mounted() {
    this.menuTagName = this.currentTag.path
  },
}
</script>

<style lang="scss" scoped>
@import "@/styles/layout/tag.scss";
</style>