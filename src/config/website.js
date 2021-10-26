/**
 * 全局配置文件
 */
export default {
  title: '', // 登录后边的字 OA
  logo: 'XF', //项目图标
  prefixKey: 'grbk', //配置主键,目前用于存储本地信息前缀
  prefixTitle: '消防监督管理系统', //浏览器标题前缀
  statusWhiteList: [520], //http的status默认放行列表

  clientId: 'saber', // 客户端id
  clientSecret: 'saber_secret', // 客户端密钥
  tenantMode: true, // 是否开启租户模式
  tenantId: '000000', // 管理组租户编号
  captchaMode: true, // 是否开启验证码模式
  lockPage: '/lock', // 锁屏页
  tokenTime: 3000,
  tokenHeader: 'Blade-Auth',

  loginWebsite: 'http://120.52.31.121:9090/sso/login?service=http://111.198.65.189:1888',
  //配置首页不可关闭
  isFirstPage: false,
  firstPage: {
    name: '首页',
    path: '/RenNing/index',
    params: {},
    query: {},
    meta: {
      keepAlive: true,
    },
    group: [],
    closable: true, //true: 不可关闭，false：可关闭
    showtab: true, //是否可作为tab标签， true: 是， false,否
    moduleSort: 1, //排序
  },
  // 配置菜单的属性
  menu: {
    iconDefault: 'iconfont icon-caidan',
    props: {
      label: 'name',
      path: 'path',
      icon: 'source',
      children: 'children',
    },
  },
  // 第三方系统授权地址
  authUrl: 'http://localhost/blade-auth/oauth/render',
  // 流程设计器地址
  flowDesignUrl: 'http://192.168.1.248:9999',
  // 流程设计器地址
  reportUrl: 'http://192.168.1.248:8108/ureport',
};
