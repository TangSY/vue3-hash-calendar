# day 插槽

### 介绍

自定义日期内容，可用于添加农历之类的，配合自定义 className 使用，效果更佳！

参数为 { date, extendAttr }，其中 extendAttr 参数包含 `isMarked`（该日期是否被标记）、`isDisabledDate`（该日期是否被禁用）、`isToday`（该日期是否为今天）、`isChecked`（该日期是否被选中）、`isCurrentMonthDay`（该日期是否为本月日期）、`isFirstDayOfMonth`（该日期是否为当月第一天），可用于一些特殊需求

### 修改当天的日期为 今

```html
<template>
  <vue-hash-calendar>
    <template v-slot:day="scope">
      <div v-if="scope?.extendAttr?.isToday">今</div>
      <div v-else>{{ scope?.date?.day }}</div>
    </template>
  </vue-hash-calendar>
</template>
```

### 农历

案例中使用的 `lunar.js` 文件获取地址：[lunar.js](https://calendar.hxkj.vip/public/lunar.js)

```html
<template>
  <vue-hash-calendar>
    <template v-slot:day="scope">
      <div class="lunar-content">
        <div>{{ scope?.date.day }}</div>
        <div class="lunar">{{ showLunar(scope?.date) }}</div>
      </div>
    </template>
  </vue-hash-calendar>
</template>
```

```js
<script setup>
import VueHashCalendar from '../../calendar';
import { lunar } from './lunar.js';

const showLunar = (date) => {
  if (!date || !date.day) return;

  const lunarObj = lunar.solar2lunar(date.year, date.month + 1, date.day);

  return lunarObj.festival || lunarObj.lunarFestival || lunarObj.IDayCn;
};
</script>
```

```css
<style>
.lunar-content {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.lunar {
  font-size: 12px;
  transform: scale(0.8);
  width: 10vw;
  text-align: center;
}
</style>
```
