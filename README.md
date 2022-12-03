<p align="center">
    <img alt="logo" src="https://calendar.hxkj.vip/public/logo.png" width="190" height="80" style="margin-bottom: 10px;">
</p>

<h1 align="center">vue3-hash-calendar</h1>

<p align="center">基于 vue3 的移动端日历组件</p>

<p align="center">
    <img src="https://travis-ci.com/TangSY/vue-hash-calendar.svg?branch=master&from=hxkj.vip&style=flat-square" alt="Build Status" />
    <a href="https://www.npmjs.com/package/vue3-hash-calendar"><img src="https://img.shields.io/npm/v/vue3-hash-calendar.svg?from=hxkj.vip&style=flat-square" alt="version" /></a>
    <a href="https://www.npmjs.com/package/vue3-hash-calendar"><img src="https://img.shields.io/npm/dt/vue3-hash-calendar.svg?from=hxkj.vip&style=flat-square" alt="download" /></a>
    <img src="https://visitor-badge.glitch.me/badge?page_id=vue3-hash-calendar&style=flat-square" alt="visitors" />
    <img src="https://img.badgesize.io/https://unpkg.com/vue3-hash-calendar@1/lib/vue3-hash-calendar.min.js?compression=gzip&style=flat-square&label=gzip%20size&color=#4fc08d" alt="Gzip Size" />
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?from=hxkj.vip&style=flat-square" alt="license" />
</p>

<p align="center">
  🔥 <a href="https://calendar.hxkj.vip">文档网站</a>
  &nbsp;&nbsp;
  🌈 <a href="https://github.com/TangSY/vue3-hash-calendar/blob/main/docs/changelog.md">更新日志</a>
</p>

---

## 特性

- 支持自定义农历/节假日
- 支持单选、多选、范围选择类型
- 上下滑动可切换周/月模式
- 支持快速切换年份和月份
- 周模式，左右滑动切换周
- 月模式，左右滑动切换月份
- 单元测试全覆盖
- 详尽的文档和示例
- 支持定制主题
- 国际化语言支持（中/英）
- 使用 TypeScript 开发，提供完整的类型定义文件

## 安装

```bash
# 通过 npm
npm i vue3-hash-calendar

# 通过 yarn
yarn add vue3-hash-calendar

# 通过 pnpm
pnpm add vue3-hash-calendar
```

## 引入

```js
import Vue from 'vue';
import VueHashCalendar from 'vue3-hash-calendar';
import 'vue3-hash-calendar/es/index.css';

Vue.use(VueHashCalendar);
```

## 使用

```html
<vue-hash-calendar />
```

## 仓库地址

- gitee：[https://gitee.com/HashTang/vue3-hash-calendar](https://gitee.com/HashTang/vue3-hash-calendar)
- github：[https://github.com/TangSY/vue3-hash-calendar](https://github.com/TangSY/vue3-hash-calendar)

## 其他版本

- vue 2.x 版本：[https://github.com/TangSY/vue-hash-calendar](https://github.com/TangSY/vue-hash-calendar)
- react 版本：[https://github.com/TangSY/react-hash-calendar](https://github.com/TangSY/react-hash-calendar)

## 效果图

### 默认配置

![default](https://calendar.hxkj.vip/public/default.jpg?from=hxkj.vip)

### 周视图模式

![week](https://calendar.hxkj.vip/public/week.jpg?from=hxkj.vip)

### 标记日期

![mark](https://calendar.hxkj.vip/public/mark.jpg?from=hxkj.vip)

### 快速切换年月

![yearmonth](https://calendar.hxkj.vip/public/yearmonth.jpg?from=hxkj.vip)

### 区间选择

![range](https://calendar.hxkj.vip/public/range.jpg?from=hxkj.vip)

### 多选

![multiple](https://calendar.hxkj.vip/public/multiple.jpg?from=hxkj.vip)
