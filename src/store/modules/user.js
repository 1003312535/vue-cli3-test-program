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
        path: '/index2',
        name: '首页2',
      },
      {
        path: '/index3',
        name: '首页3',
        children: [
          {
            path: '/index4',
            name: '首页4',
          },
          {
            path: '/index5',
            name: '首页5',
            children: [
              {
                path: '/index6',
                name: '首页6',
              },
              {
                path: '/index7',
                name: '首页7',
              },
            ],
          },
        ],
      },
      {
        path: '/index8',
        name: '首页8',
      },
      {
        path: '/index9',
        name: '首页9',
      },
      {
        path: '/index0',
        name: '首页0',
      },
    ],
  },
  actions: {},
  mutations: {},
};