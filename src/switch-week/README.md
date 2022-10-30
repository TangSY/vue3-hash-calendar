# 切换星期

### 介绍

lastWeek(): 上一星期

ne xtWeek(): 下一星期

### lastWeek

```html
<button @click="lastWeek">上一星期</button>
<button @click="nextWeek">下一星期</button>
<vue-hash-calendar ref="calendar" :show-week-view="true" />
```

```js
<script setup>
import { ref } from 'vue';

const calendar = ref(null);

const lastWeek = () => {
  calendar.value.lastWeek();
};
const nextWeek = () => {
  calendar.value.nextWeek();
};
</script>
```
