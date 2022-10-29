# model

### 介绍

日历组件以哪种形式展示。inline：内联的方式。dialog：弹窗的方式

### inline

```html
<vue-hash-calendar model="inline" v-model:visible="isShow" />
```

### dialog

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
