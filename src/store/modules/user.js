export default {
  state: {
    userInfo: {} || {},
    roles: [],
    token: '',
    menuId: [],
    menuList: [
      {
        path: '/index1',
        name: '首页1首页1首页1首页1首页1',
      },
      {
        path: '/RenNing/ceshi',
        name: '首页3',
        children: [
          {
            path: '/RenNing/ceshi',
            name: '首页4',
          },
          {
            path: '/index5',
            name: '首页5',
          },
        ],
      },
    ],
  },
  actions: {},
  mutations: {},
};
