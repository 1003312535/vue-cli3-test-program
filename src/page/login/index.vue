<!-- login 登录页面 -->
<template>
  <div>
    <avue-login :option="option" @submit="submit"></avue-login>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        width: 400,
        time: 60,
        codeType: "phone", //phone为手机验证码/img为图片验证码
        column: {
          username: {
            label: "用户名",
            prop: 'user',
            placeholder:'用户名',
            autocomplete: "off",
            rules: { required: true, message: "请输入用户名", trigger: "blur" },
          },
          password: {
            label: "密码",
            prop: 'password',
            placeholder:'password',
            autocomplete: "off",
            rules: { required: true, message: "请输入密码", trigger: "blur" },
          },
          code: {
            hide: true
          }
        },
      },
    }
  },
  methods: {
    //点击 登录按钮
    submit(form) {
      this.$message.success(JSON.stringify(form))
      console.log(form);
    }
  }
}
</script>

<style>
</style>