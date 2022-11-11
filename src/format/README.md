# format

### 介绍

回调事件返回的日期格式

### YY/MM/DD hh:mm

```html
<template>
  <vue-hash-calendar format="YY/MM/DD hh:mm" @change="handleChange" />
</template>
```

```js
<script setup>
const handleChange = (val) => {
  console.log(val);
};
</script>
```

### MM DD,YY at hh:mm F

```html
<template>
  <vue-hash-calendar format="MM DD,YY at hh:mm F" @change="handleChange" />
</template>
```

```js
<script setup>
const handleChange = (val) => {
  console.log(val);
};
</script>
```

### YY 年 MM 月第 DD 天，当前时间 hh 时 mm 分

```html
<template>
  <vue-hash-calendar
    format="YY 年 MM 月第 DD 天，当前时间 hh 时 mm 分"
    @change="handleChange"
  />
</template>
```

```js
<script setup>
const handleChange = (val) => {
  console.log(val);
};
</script>
```
