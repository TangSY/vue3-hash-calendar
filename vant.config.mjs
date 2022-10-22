export default {
  name: 'vue3-hash-calendar',
  build: {
    css: {
      preprocessor: 'less',
    },
    site: {
      publicPath: '/vue3-hash-calendar/',
    },
    // srcDir: process.env.BUILD_TARGET === 'site' ? './src' : './src/calendar',
    configureVite(config) {
      const { BUILD_TARGET } = process.env;

      if (BUILD_TARGET === 'package') {
        // 修改组件库构建配置
      }

      return config;
    },
  },
  site: {
    title: 'vue3-hash-calendar',
    logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
    description: '基于 vue3 版本的周 月 时间选择器',
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
        title: '基础组件',
        items: [
          {
            path: 'demo-button',
            title: 'DemoButton 按钮',
          },
          {
            path: 'calendar',
            title: '日历组件',
          },
        ],
      },
    ],
  },
};
