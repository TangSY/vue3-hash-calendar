# theme-color

### 介绍

用于修改日历主题色，目前支持以下几个属性：

```js
{
    'main-color': string;
    'bg-color': string;
    'main-font-color': string;
    'vice-font-color': string;
    'disabled-bg-color': string;
    'disabled-font-color': string;
}
```

### 代码演示

```html
<template>
  <button @click="change">切换主题色</button>
  <vue-hash-calendar :theme-color="themeColor" />
</template>
```

```js
<script setup>
import { ref } from 'vue';

const themeColor = ref({});

const change = () => {
  themeColor.value = {
    'main-color': 'red',
    'bg-color': 'grey',
    'main-font-color': 'blue',
    'vice-font-color': 'green',
    'disabled-bg-color': 'black',
    'disabled-font-color': 'yellow',
  };
};
</script>
```
