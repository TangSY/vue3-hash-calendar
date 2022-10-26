# 弹窗形式

### 代码演示

```html
<button @click="showCalendar">点击打开日历弹窗</button>
<vue-hash-calendar model="dialog" v-model:visible="isShow" />
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
