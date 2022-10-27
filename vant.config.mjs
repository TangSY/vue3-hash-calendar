const componentsDir = ['calendar', 'model', 'scroll-change-date'];
const configMenu = componentsDir.map((dir) => ({
  path: dir,
  title: dir === 'calendar' ? '最简配置' : dir,
}));

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
          {
            path: 'api',
            title: 'API',
          },
          {
            path: 'question',
            title: '常见问题',
          },
          {
            path: 'changelog',
            title: '更新日志',
          },
          {
            path: 'sponsor',
            title: '赞助',
          },
        ],
      },
      {
        title: '配置指南',
        items: configMenu,
      },
    ],
  },
};
