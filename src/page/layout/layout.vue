<template>
  <div class="layout">
    <keep-alive>
      <router-view class="avue-view" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view class="avue-view" v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.layout {
  background: #eee;
  .container {
    background: #aaa;
  }
}
</style>