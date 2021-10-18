<!-- 头部区域   -->
<template>
  <div class="Header">
    <!-- logo 图标区域 -->
    <div class="logo" :class="isCollapse? 'logo_collapse':''"></div>
    <!-- 折叠二级菜单区域 -->
    <div class="collapse_btn" @click="toggleCollapse"><i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"></i></div>
    <!-- 一级菜单区域 -->
    <div class="top_menu">
      <el-tabs @tab-click="handleClick" v-model="topMenuId">
        <el-tab-pane label="消息中心" name="1">
          <div slot="label" class="top_menu_item">
            <i class="el-icon-date top_menu_img"></i>
            <div class="menu_title"></div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 其他功能区域 -->
    <div class="top_feature">
      <div class="feature_item" @click="toggleScreen">
        <el-tooltip effect="dark" :content="isFullScreen?'退出全屏':'全屏'" placement="bottom">
          <div class="asd"><i :class="isFullScreen?'el-icon-platform-eleme':'el-icon-platform-eleme'"></i></div>
        </el-tooltip>
      </div>
      <div class="feature_item">
        <el-tooltip effect="dark" :content="WaterMarkStatus?'关闭水印':'开启水印'" placement="bottom">
          <el-switch v-model="WaterMarkStatus" @change="toggleWaterMark"></el-switch>
        </el-tooltip>
      </div>

    </div>
    <!-- 用户信息区域 -->
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import {
  fullscreenToggel,
  fullscreenEnable,
  reqFullScreen,
  exitFullScreen,
  setTheme,
  listenfullscreen,
} from "@/utils/util"
export default {
  name: "top",
  data() {
    return {
      topMenuId: "1",
      WaterMarkStatus: false, //水印状态
      instanceWaterMark: null, //水印实例
    }
  },
  computed: {
    ...mapGetters(["isFullScreen", "isWaterMark",'isCollapse']),
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    //切换 折叠
    toggleCollapse() {
      this.$store.commit("SET_COLLAPSE")
    },
    //切换全屏
    toggleScreen() {
      fullscreenToggel()
    },
    //设置 isFullScreen 标识
    setScreen() {
      this.$store.commit("SET_FULLSCREEN")
    },
    //切换水印
    toggleWaterMark(value) {
      //true false
      this.$store.commit("SET_WATERMARK")
    },
    //初始化水印
    initWaterMark() {
      this.WaterMarkStatus = this.isWaterMark
      if (this.WaterMarkStatus) {
        this.instanceWaterMark = this.watermark({
          text: `我是水印我是水印我是水印`,
          font: "12px 黑体",
        })
      } else {
        this.instanceWaterMark && this.instanceWaterMark.remove()
      }
    },
  },
  mounted() {
    listenfullscreen(this.setScreen) //如果屏幕全屏切换，调用修改vuex配置
    this.initWaterMark()
  },
  watch: {
    //水印状态监听
    isWaterMark: {
      handler(value) {
        console.log(value, "isWaterMark")
        this.initWaterMark()
      },
    },
  },
}

</script>

<style scoped lang="scss">
@import "@/styles/layout/top.scss";
</style>