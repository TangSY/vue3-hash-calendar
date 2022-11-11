# 切换月份

### 介绍

lastMonth(): 上一月

nextMonth(): 下一月

### lastMonth

```html
<template>
  <button @click="lastMonth">上一月</button>
  <button @click="nextMonth">下一月</button>
  <vue-hash-calendar ref="calendar" />
</template>
```

```js
<script setup>
import { ref } from 'vue';

const calendar = ref(null);

const lastMonth = () => {
  calendar.value.lastMonth();
};
const nextMonth = () => {
  calendar.value.nextMonth();
};
</script>
```
