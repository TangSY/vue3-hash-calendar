# visible

### 介绍

控制日历组件的显示或隐藏

### 代码演示

```html
<template>
  <button @click="showCalendar">点击打开日历弹窗</button>
  <vue-hash-calendar model="dialog" v-model:visible="isShow" />
</template>
```

```js
<script setup>
import { ref } from 'vue';

const isShow = ref(false);
const showCalendar = () => {
  isShow.value = true;
};
</script>
```
