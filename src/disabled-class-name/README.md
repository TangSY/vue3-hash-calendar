# disabled-class-name

### 介绍

日期被禁用时的 className。用于修改日期被禁用时的默认样式

### 代码演示

```html
<template>
  <vue-hash-calendar
    disabled-class-name="disabled-class-name"
    :disabled-date="disabledAfterCurrentDate"
  />
</template>
```

```js
<script setup>
const disabledAfterCurrentDate = (date) => {
  const timestamp = date.getTime();
  if (timestamp > new Date().getTime()) {
    return true;
  }

  return false;
};
</script>
```

```css
.disabled-class-name {
  color: blue;
  background: red;
}
```
