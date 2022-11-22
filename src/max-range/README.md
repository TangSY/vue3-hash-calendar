# max-range

### 介绍

当 `select-type` 为 `range` 或 `multiple` 时，日期最多可选天数

### range

最多可选连续 5 天

```html
<template>
  <vue-hash-calendar
    select-type="range"
    :max-range="5"
    @over-range="overRange"
    :default-datetime="null"
  />
</template>
```

```js
<script setup>
const overRange = () => {
  console.log('overRange');
};
</script>
```

### multiple

最多可累计选择 5 天

```html
<template>
  <vue-hash-calendar
    select-type="multiple"
    :max-range="5"
    @over-range="overRange"
    :default-datetime="null"
  />
</template>
```

```js
<script setup>
const overRange = () => {
  console.log('overRange');
};
</script>
```
