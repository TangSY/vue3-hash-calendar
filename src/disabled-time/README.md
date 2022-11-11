# disabled-time

### 介绍

设置时间的禁用状态，参数为当前时间，要求返回 Boolean （禁用该时间需返回 true）

### 禁用 2 点 2 分之后的时间

以 `picker-type="time"` 为例

```html
<template>
  <vue-hash-calendar picker-type="time" :disabled-time="disabledBeforeTime" />
</template>
```

```js
<script setup>
const disabledBeforeTime = (date) => {
  const hours = date.getHours();
  const minute = date.getMinutes();

  if (hours > 2 || (hours === 2 && minute > 2)) {
    return true;
  }
  return false;
};
</script>
```
