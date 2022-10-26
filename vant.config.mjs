export default {
  name: 'vue3-hash-calendar',
  build: {
    css: {
      removeSourceFile: true,
    },
    namedExport: true,
    site: {
      publicPath: '/vue3-hash-calendar/',
    },
    // srcDir: process.env.BUILD_TARGET === 'site' ? './src' : './src/calendar',
  },
  site: {
    title: 'vue3-hash-calendar',
    logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
    description: '基于 vue3 版本的周 月 时间选择器',
    baiduAnalytics: {
      seed: 'b0668f30d62e1597bdb36d05edea8960',
    },
    darkModeClass: 'van-theme-dark',
    lightModeClass: 'van-theme-light',
    links: [
      {
        logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/weapp.svg',
        url: 'https://gitee.com/HashTang/vue3-hash-calendar',
      },
      {
        logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/github.svg',
        url: 'https://github.com/TangSY/vue3-hash-calendar',
      },
    ],
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
        ],
      },
      {
        title: '配置指南',
        items: [
          {
            path: 'calendar',
            title: '最简配置',
          },
          {
            path: 'calendar-dialog',
            title: '弹窗形式',
          },
          {
            path: 'calendar-scroll-change-date',
            title: '滑动不修改选中的日期',
          },
        ],
      },
    ],
  },
};
