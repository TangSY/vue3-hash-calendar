# event

### 介绍

控制日历组件的显示或隐藏

### 代码演示

```html
<template>
  <button @click="showCalendar">点击打开日历弹窗</button>
  <vue-hash-calendar
    model="dialog"
    v-model:visible="isShow"
    @click="onClick"
    @confirm="onConfirm"
    @change="onChange"
    @touchstart="onTouchstart"
    @touchmove="onTouchmove"
    @touchend="onTouchend"
    @slidechange="onSlidechange"
    @calendarTypeChange="onTypeChange"
  />
</template>
```

```js
<script setup>
import { ref } from 'vue';

const isShow = ref(true);

const showCalendar = () => {
  isShow.value = true;
};

const onClick = (date) => {
  console.log('onClick', date);
};

const onConfirm = (date) => {
  console.log('onConfirm', date);
};

const onChange = (date) => {
  console.log('onChange', date);
};

const onTouchstart = (date) => {
  console.log('onTouchstart', date);
};

const onTouchmove = (date) => {
  console.log('onTouchmove', date);
};

const onTouchend = (date) => {
  console.log('onTouchend', date);
};

const onSlidechange = (date) => {
  console.log('onSlidechange', date);
};

const onTypeChange = (date) => {
  console.log('onTypeChange', date);
};
</script>
```
