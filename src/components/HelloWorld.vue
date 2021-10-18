<template>
  <div class="hello">
    <div class="box animated bounceInDown">message</div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      message: 'Hello World!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{width: 100px; height: 100px;background: red;}
</style>
