<!-- 布局容器 -->
<template>
  <div class="layout_container">
    <!-- 顶 -->
    <layout-top></layout-top>
    <!-- 左 -->
    <div class="layout_wrap">
      <layout-aside></layout-aside>
      <div class="layout_main">
        <!-- 标签导航 -->
        <layout-tag></layout-tag>
        <div class="layout_center">
          <layout />
        </div>
        <div class="layout_footer"></div>
      </div>
    </div>

    <div id="selectMenu">
      <ul id="selectMenuList">
        <li>复制</li>
        <li>法律法规搜索</li>
      </ul>
    </div>
  </div>
</template>

<script>
import layoutTop from "@/page/layout/top"
import layoutAside from "@/page/layout/aside"
import layoutTag from "@/page/layout/tag"
import layout from '@/page/layout/layout'
export default {
  components: { layoutTop, layoutAside,layoutTag,layout },
  data() {
    return { checkList: [] }
  },
  mounted() {
    let that = this
    var menu = document.getElementById("selectMenu")
    document.addEventListener("mousedown", mouseDown)
    document.addEventListener("mouseup", mouseUp)
    document.oncontextmenu = function (ev) {
      //阻止鼠标的默认事件
      ev.preventDefault() //做一些兼容性的处理
      var ev = ev || event
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      menu.style.display = "block"
      menu.style.left = ev.clientX + "px"
      //当滑动滚动条时也能准确获取菜单位置
      menu.style.top = ev.clientY + scrollTop + "px"
    }
    window.addEventListener(
      "keydown",
      function (event) {
        // console.log(123);
        if (event.code == "Escape") {
          this.isSearch = false
        }
      }.bind(this)
    )
    function mouseDown(event) {
      if (event.target.parentElement.id == "selectMenuList") {
        var t = event.target
        if (t.innerText == "复制") {
          that
            .$Clipboard({
              text: that.text,
            })
            .then(() => {
              // that.$message.success('复制成功!');
            })
            .catch(() => {
              // that.$message.error('复制失败!');
            })
          menu.style.display = "none"
        } else {
          console.log(that.text)
          const ne = that.$router.resolve({
            path: "/xfjd/flfg/mbgl/flfgcxw",
            query: { keyWord: that.text },
          })
          window.open(ne.href, "_blank")
          menu.style.display = "none"
        }
      } else if (event.button == 0) {
        menu.style.display = "none"
      }
    }
    function mouseUp(ev) {
      var text = ""
      if (window.getSelection) {
        text = window.getSelection().toString()
      } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text
      }
      if ("" != text) {
        that.text = text
      }
    }
  },
}
</script>

<style scoped lang="scss">
// 右键
#selectMenu {
  width: 108px;
  z-index: 99999;
  position: absolute;
  display: none;
  #selectMenuList {
    background: #fdfdfd;
    border: 1px solid rgb(228, 228, 228);
    border-bottom: none;
    border-radius: 4px;
    box-shadow: 0px 0px 10px #999;
  }
  li {
    cursor: pointer;
    list-style: none;
    border-bottom: 1px solid #ccc;
    text-align: center;
  }
}
</style>