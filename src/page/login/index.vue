<!-- login 登录页面 -->
<template>
  <div class="container">
    <div class="login_container">
      <!-- <div class="login_wrap animated bounceInDown" @mouseenter="activeBackground($event)" @mouseleave="disActiveBackground($event)"> -->
      <div class="login_wrap animated bounceInDown">
        <avue-login :option="option" @submit="submit" style="position: relative;z-index: 9999"></avue-login>
        <div class="formBg"></div>
      </div>
    </div>
    <div class="star_wrap">
      <div class="star_item" v-for="(item,index) in starForm.starCount" :key="index"></div>
    </div>
    <!-- <el-card class="box-card" @click.native="handleClick">
      <el-form ref="starForm" :model="starForm" label-width="80px">
        <el-form-item label="星星数">
          <el-input v-model.number="starForm.starCount"></el-input>
        </el-form-item>
        <el-form-item label="距离范围">
          <el-input v-model.number="starForm.minDistance"></el-input>
          <el-input v-model.number="starForm.maxDistance"></el-input>
        </el-form-item>
        <el-form-item label="扩散范围">
          <el-input v-model.number="starForm.minDeg"></el-input>
          <el-input v-model.number="starForm.maxDeg"></el-input>
        </el-form-item>
      </el-form>
    </el-card> -->
  </div>
</template>

<script>
import bg from "@/utils/mixin/bg"
export default {
  mixins: [bg],
  data() {
    return {
      formBg: null,//formBg 元素
      option: {
        width: 400,
        time: 60,
        codeType: "phone", //phone为手机验证码/img为图片验证码
        column: {
          username: {
            label: "用户名",
            prop: "user",
            placeholder: "用户名",
            autocomplete: "off",
            rules: { required: true, message: "请输入用户名", trigger: "blur" },
          },
          password: {
            label: "密码",
            prop: "password",
            placeholder: "password",
            autocomplete: "off",
            rules: { required: true, message: "请输入密码", trigger: "blur" },
          },
          code: {
            hide: true,
          },
        },
      },
    }
  },
  methods: {
    //点击 登录按钮
    submit(form) {
      this.$message.success(JSON.stringify(form))
      console.log(form)
    },
    //激活form 的 bg
    activeBackground(e) {
      /**
       * 首先获取位置
       * 设置scale 缩放原点给
       */
      console.log(e,'activeBackground')
      this.formBg.style.top = `${e.offsetY}px`
      this.formBg.style.left = `${e.offsetX}px`
      this.formBg.style.display = `block`
      this.formBg.classList.remove('disActiveFormBg')
      this.formBg.classList.add('activeFormBg')
      // this.formBg.style.transition = '3s';
      // this.formBg.style.transform = `translate(-50%, -50%) scale(${10})`
    },
    disActiveBackground(e) {
      /**
       * 退出位置
       *
       */
      console.log(e,'disActiveBackground')
      this.formBg.style.top = `${e.offsetY}px`
      this.formBg.style.left = `${e.offsetX}px`
      this.formBg.classList.remove('activeFormBg')
      this.formBg.classList.add('disActiveFormBg')
      // this.formBg.style.display = `none`
    },
  },
  mounted() {
    this.formBg = document.querySelector('.formBg')
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  background: black;
}
.login_container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  //登录卡片
  .login_wrap {
    position: relative;
    z-index: 9999;
    width: 400px;
    margin: 200px auto;
    background: rgba($color: #fff, $alpha: 0.7);
    border-radius: 20px;
    box-shadow: 0 0 12px 1px rgba($color: #000000, $alpha: 0.4);
    padding: 40px 40px 20px;
    overflow: hidden;
    //form 的bg动画
    .formBg {
      z-index: 1;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(-50%, -50%) scale(0);
      display: none;
      background: #fff;
      &.activeFormBg{
        animation: activeFormBg .3s forwards;
      }
      &.disActiveFormBg{
         animation: disActiveFormBg .3s forwards;
      }
    }
  }
}

//背景色星星样式
.star_wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  // background: rgba($color: #000000, $alpha: 0.2);
  // perspective: 500;
  // transform-style: preserve-3d;
  transform-style: preserve-3d;
  // perspective: 1500px;
  // transform: translate(-50%, -50%) rotateX(8deg) rotateZ(22deg) rotateY(-0deg);
  transform: translate(-50%, -50%)  rotateY(-0deg);
  animation: rotateStar 90s infinite;
  perspective-origin: top;
  .star_item {
    background: #fff;
    filter: blur(1px);
    box-shadow: 0 0 10px 2px white;
    position: absolute;
    border-radius: 50%;
    // backface-visibility: hidden;
    animation: starRotate 12 infinite;
    transition: 6000s;
  }
}
//星星控件
.box-card {
  position: fixed;
  right: 20px;
  top: 20px;
  opacity: 0.3;
}
@-webkit-keyframes rotateStar {
  from {
    transform: translateZ(-1000px)  rotateY(0deg);
  }
  to {
    transform: translateZ(-1000px)  rotateY(360deg);
  }
}

// form 登录卡片的背景动画
@-webkit-keyframes activeFormBg {
  from {
    transform:translate(-50%, -50%) scale(0);
  }
  to {
    transform:translate(-50%, -50%) scale(10);
  }
}
@-webkit-keyframes disActiveFormBg {
  from {
    transform:translate(-50%, -50%) scale(10);
  }
  to {
    transform:translate(-50%, -50%) scale(0);
  }
}
</style>