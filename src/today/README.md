# today()

### 介绍

返回今日。当今日被禁用时，不生效

### 代码演示

```html
<button @click="today">返回今日</button>

<vue-hash-calendar ref="calendar" />
```

```js
<script setup>
import { ref } from 'vue';

const calendar = ref(null);

const today = () => {
  calendar.value.today();
};
</script>
```
