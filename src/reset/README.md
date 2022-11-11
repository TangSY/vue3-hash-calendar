# reset()

### 介绍

重置日历到指定日期。

(date: Date) => void

### 代码演示

```html
<template>
  <input type="text" v-model="date" />
  <button @click="reset">重置</button>
  <vue-hash-calendar ref="calendar" />
</template>
```

```js
<script setup>
import { ref } from 'vue';
import VueHashCalendar from '../../calendar';

const calendar = ref(null);
const date = ref('2018/08/08 08:08');

const reset = () => {
  calendar.value.reset(new Date(date));
};
</script>
```
