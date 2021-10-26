<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="form"
           :model="form"
           label-width="0">
    <!-- <el-form-item v-if="tenantMode" prop="tenantId">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="form.tenantId"
                auto-complete="off"
                placeholder="请输入租户ID">
        <i slot="prefix" class="icon-quanxian"/>
      </el-input>
    </el-form-item> -->
    <el-form-item prop="username">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                v-model="form.username"
                auto-complete="off"
                placeholder="请输入账号">
        <i slot="prefix" class="icon-yonghu"/>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="small"
                @keyup.enter.native="handleLogin"
                :type="passwordType"
                v-model="form.password"
                auto-complete="off"
                placeholder="请输入密码">
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"/>
        <i slot="prefix" class="icon-mima"/>
      </el-input>
    </el-form-item>
    <el-form-item v-if="this.website.captchaMode" prop="code">
      <el-row :span="24">
        <el-col :span="16">
          <el-input size="small"
                    @keyup.enter.native="handleLogin"
                    v-model="form.code"
                    auto-complete="off"
                    placeholder="请输入验证码">
            <i slot="prefix" class="icon-yanzhengma"/>
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <img :src="form.image" class="login-code-img" @click="refreshCode"/>
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="small" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  import {mapGetters} from "vuex";
  // import {info} from "@/api/system/tenant";
  import {getCaptcha} from "@/api/user";
  export default {
    name: "userlogin",
    data() {
      return {
        tenantMode: this.website.tenantMode,
        form: {
          //租户ID
          tenantId: "000000",
          //用户名
          username: "",
          //密码
          password: "",
          //账号类型
          type: "account",
          //验证码的值
          code: "",
          //验证码的索引
          key: "",
          //预加载白色背景
          image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        },
        loginRules: {
          tenantId: [
            {required: false, message: "请输入租户ID", trigger: "blur"}
          ],
          username: [
            {required: true, message: "请输入用户名", trigger: "blur"}
          ],
          password: [
            {required: true, message: "请输入密码", trigger: "blur"},
            {min: 1, message: "密码长度最少为6位", trigger: "blur"}
          ]
        },
        passwordType: "password"
      };
    },
    created() {
      this.refreshCode();
    },
    mounted() {},
    computed: {
      ...mapGetters(["tagWel"])
    },
    props: [],
    methods: {
      refreshCode() {
        getCaptcha().then(res => {
          const data = res.data;
          this.form.key = data.key;
          this.form.image = data.image;
        })
      },
      showPassword() {
        this.passwordType === ""
          ? (this.passwordType = "password")
          : (this.passwordType = "");
      },
      // 点击登录
      handleLogin() {
        this.$refs.form.validate(valid => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '登录中,请稍后。。。',
              spinner: "el-icon-loading"
            });
            this.$store.dispatch("LoginByUsername", {user:this.form}).then(() => {
              this.$router.push({path: this.tagWel.value});
              loading.close();
            }).catch(() => {
              this.form.code="";
              loading.close();
              this.refreshCode();
            });
          }
        });
      },
    }
  };
</script>

<style lang='scss' scoped>
  .login-form .el-input input{
    padding-top: 10px !important;
  }
</style>
