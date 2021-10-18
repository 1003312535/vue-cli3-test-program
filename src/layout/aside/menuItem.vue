<template>
  <div>
    <template v-if="menuItem.children">
      <el-submenu :index="menuItem.path">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title" :class="isCollapse?'menu_title_display':''">{{menuItem.name}}</span>
        </template>
        <menuItem v-for="(item,index) in menuItem.children" :key="item.path" :menuItem="item">
        </menuItem>
      </el-submenu>
    </template>
    <template v-else>
      <el-menu-item :index="menuItem.path">
        <i class="el-icon-menu"></i>
        <span slot="title">{{menuItem.name}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  name: "menuItem",
  props: { menuItem: Object },
  mounted() {
    console.log(this.menuItem, this.menuItem.children, "this.menuItem---")
  },
  computed: {
    ...mapGetters(["isCollapse"]),
  },
}
</script>

<style scoped lang="scss">
</style>