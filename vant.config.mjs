const componentsProp = [
  'calendar',
  'picker-type',
  'select-type',
  'model',
  'visible',
  'scroll-change-date',
  'default-datetime',
  'min-date',
  'max-date',
  'max-range',
  'format',
  'week-start',
  'mark-date',
  'minute-step',
  'change-year-fast',
  'show-today-button',
  'show-week-view',
  'show-arrow',
  'show-action',
  'show-not-current-month-day',
  'disabled-week-view',
  'disabled-date',
  'disabled-time',
  'disabled-scroll',
  'theme-color',
  'lang',
  'disabled-class-name',
  'not-current-month-day-class-name',
  'checked-day-class-name',
  'today-class-name',
  'first-day-of-month-class-name',
];
const propConfig = componentsProp.map((dir) => ({
  path: dir,
  title: dir === 'calendar' ? '最简配置' : dir,
}));

const componentsSlot = ['day', 'week', 'arrow', 'action', 'today', 'confirm'];
const slotConfig = componentsSlot.map((dir) => ({
  path: `${dir}-slot`,
  title: dir,
}));

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'process', {
    get() {
      return { env: {} };
    },
    set() {},
  });
}

export default {
  name: 'vue3-hash-calendar',
  build: {
    css: {
      removeSourceFile: true,
    },
    namedExport: true,
    site: {
      publicPath: '/calendar/',
    },
    srcDir:
      process.env.npm_lifecycle_event === 'build' ? './src/calendar' : './src',
  },
  site: {
    title: 'vue3-hash-calendar',
    logo: 'https://calendar.hxkj.vip/public/logo.png',
    description: '基于 vue3 版本的周 月 时间选择器',
    baiduAnalytics: {
      seed: 'b0668f30d62e1597bdb36d05edea8960',
    },
    headHtml: `<style type="text/css">
    .hash-demo-title {
      padding: 24px;
      font-size: 20px;
      text-align: center;
    }
    .hash-notify {
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: 10px;
      color: #fff;
      font-size: 14px;
      background: #1c71fb;
      white-space: pre-wrap;
      text-align: center;
      word-wrap: break-word;
    }
    .van-theme-dark .hash-calendar .calendar_group_li {
      background: var(--van-doc-background-2);
    }
    .van-theme-dark .hash-calendar .calendar_week {
      background: var(--van-doc-background-2);
    }
    .van-theme-dark .hash-calendar .calendar_title_date {
      background: var(--van-doc-background-2);
    }
    .van-theme-dark .hash-calendar .calendar_title {
      background: var(--van-doc-background-2);
      border-bottom: var(--van-doc-background-2);
    }
    .van-theme-dark .hash-calendar .calendar_content {
      background: var(--van-doc-background-2);
    }
    .van-theme-dark .hash-calendar .calendar_group_ul {
      background: var(--van-doc-background-2);
    }
    .van-theme-dark .hash-calendar .year-body {
      background: rgb(45, 46, 49);
    }
    </style>`,
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
          { path: 'home', title: '介绍' },
          { path: 'quickstart', title: '快速上手' },
          { path: 'api', title: 'API' },
          { path: 'question', title: '常见问题' },
          { path: 'changelog', title: '更新日志' },
          { path: 'sponsor', title: '赞助' },
        ],
      },
      {
        title: 'Props 使用指南',
        items: propConfig,
      },
      {
        title: 'Event 使用指南',
        items: [{ title: '事件回调', path: 'event' }],
      },
      {
        title: 'Method 使用指南',
        items: [
          { title: '切换月份', path: 'switch-month' },
          { title: '切换星期', path: 'switch-week' },
          { title: '返回今日', path: 'today' },
          { title: '重置日历到指定日期', path: 'reset' },
        ],
      },
      {
        title: 'Slot 使用指南',
        items: slotConfig,
      },
    ],
  },
};
