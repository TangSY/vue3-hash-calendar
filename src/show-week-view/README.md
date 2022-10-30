# show-week-view

### 介绍

是否以周视图展示组件

### 代码演示

```html
<button @click="toggle">点击切换视图</button>
<vue-hash-calendar v-model:show-week-view="isShow" />
```

```js
<script setup>
import { ref } from 'vue';

const isShow = ref(false);
const toggle = () => {
  isShow.value = !isShow.value;
};
</script>
```
