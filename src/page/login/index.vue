<template>
  <div class="login-container">
    <top-color v-show="false"></top-color>
    <div class="login-weaper animated bounceInDown">
      <div class="login-left">
        <div class="login-time">
          {{time}}
        </div>
        <!-- <img class="img" src="/img/logo.png" alt=""> -->
        <p class="title">{{website.indexTitle}}</p>
      </div>
      <div class="login-border">
        <div class="login-main">
          <h4 class="login-title">
            登录{{website.title}}
          </h4>
          <userLogin v-if="activeName==='user'"></userLogin>
          <codeLogin v-else-if="activeName==='code'"></codeLogin>
          <thirdLogin v-else-if="activeName==='third'"></thirdLogin>
          <!-- 第三方登录 -->
          <!-- <div class="login-menu">
            <a href="#" @click.stop="activeName='user'">账号密码登录</a>
            <a href="#" @click.stop="activeName='code'">手机号登录</a>
            <a href="#" @click.stop="activeName='third'">第三方系统登录</a>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userLogin from "./userlogin";
import codeLogin from "./codelogin";
import thirdLogin from "./thirdlogin";
import {mapGetters} from "vuex";
import {dateFormat} from "@/util/date";
import {validatenull} from "@/util/validate";
import topColor from "@/page/index/top/top-color";
import {getQueryString, getTopUrl,urlToObj} from "@/util/util";
import {getRunId} from '@/api/table/table';

  export default {
    name: "login",
    components: {
      userLogin,
      codeLogin,
      thirdLogin,
      topColor
    },
    data() {
      return {
        time: "",
        activeName: "user",
        socialForm: {
          tenantId: "000000",
          source: "",
          code: "",
          state: "",
        }
      };
    },
    watch: {
      $route() {
        this.handleLogin();
      }
    },
    created() {
      this.handleLogin();
      this.getTime();
    },
    mounted() {},
    computed: {
      ...mapGetters(["website", "tagWel"])
    },
    props: [],
    methods: {
      getTime() {
        setInterval(() => {
          this.time = dateFormat(new Date());
        }, 1000);
      },
      // 验证
      getTenant() {
        let url = window.location.href;
        let arr = url.match(/\?(\S*)#/);
        let arr2 = url.split("/#/login?");
        if(arr&&arr.length>0){
          let obj=urlToObj(arr[1]);
          if(obj.ticket){
            this.thirdPartyLogin({ticket:obj.ticket});
          }
        }
        if(arr2&&arr2.length>0){
          let obj=urlToObj(arr2[1]);
          if(obj.ticket){
            this.thirdPartyLogin({ticket:obj.ticket});
          }
          // 跳转其他系统进入
          if(obj.type==1){
            obj.grant_type="serverpassword";
            obj.tenantId="000000";
            obj.username=obj.user;
            // obj.password=obj.password;
            delete obj.type;
            console.log({
              callbackUrl:decodeURIComponent(obj.path)
            });
            this.thirdPartyLogin(obj,{
              callbackUrl:decodeURIComponent(obj.path)
            });
          }
        }
        // 临时指定域名，方便测试
        // 租户信息
        // info(domain).then(res => {
        //   const data = res.data;
        //   if (data.success && data.data.tenantId) {
        //     this.tenantMode = false;
        //     this.form.tenantId = data.data.tenantId;
        //     this.$parent.$refs.login.style.backgroundImage = `url(${data.data.backgroundUrl})`;
        //   }
        // })
      },
      // 第三方系统登录
      thirdPartyLogin(obj,head){
        const loading = this.$loading({
          lock: true,
          text: '第三方系统登录中,请稍后。。。',
          spinner: "el-icon-loading"
        });
        this.$store.dispatch("LoginByUsername", {user:obj,head}).then((res) => {
          // let url=res.data.callbackUrl;
          // if(url){
          //   getRunId({ opId: 129, runId: -1 }).then(res => {
          // console.log(url);
          //     this.$router.push({
          //       path: url,
          //       query: {
          //         runId: res.data.data,
          //       },
          //     });
          //   });
          //   loading.close();
          // }else{
            this.$router.push({path:this.tagWel.value});
            loading.close();
          // }
        }).catch((err) => {
          window.open(this.website.loginWebsite,"_self");
          // window.open(this.website.loginWebsite);
          loading.close();
        });
      },
      handleLogin() {
        this.getTenant();
        // const topUrl = getTopUrl();
        // const redirectUrl = "/oauth/redirect/";
        // this.socialForm.source = getQueryString("source");
        // this.socialForm.code = getQueryString("code");
        // this.socialForm.state = getQueryString("state");
        // if (validatenull(this.socialForm.source) && topUrl.includes(redirectUrl)) {
        //   let source = topUrl.split("?")[0];
        //   source = source.split(redirectUrl)[1];
        //   this.socialForm.source = source;
        // }
        // if (!validatenull(this.socialForm.source) && !validatenull(this.socialForm.code) && !validatenull(this.socialForm.state)) {
        //   const loading = this.$loading({
        //     lock: true,
        //     text: '第三方系统登录中,请稍后。。。',
        //     spinner: "el-icon-loading"
        //   });
        //   this.$store.dispatch("LoginBySocial", this.socialForm).then(() => {
        //     window.location.href = topUrl.split(redirectUrl)[0];
        //     this.$router.push({path: this.tagWel.value});
        //     loading.close();
        //   }).catch(() => {
        //     loading.close();
        //   });
        // }
      }
    }
  };
</script>

<style lang="scss">
  @import "@/styles/login.scss";
</style>
<style lang="scss" scoped>
  .title{
    margin-top: 280px;
    font-size: 40px;
    font-weight: bolder;
  }
  .login-left{
    background-image: url("/img/XF/LOGIN.jpg");
  }
</style>
