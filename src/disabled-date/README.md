# disabled-date

### 介绍

设置日期的禁用状态，参数为当前日期，要求返回 Boolean （禁用该日期需返回 true）

### 禁用 2022 年 1 月 15 号 之后的所有日期

```html
<template>
  <vue-hash-calendar :disabled-date="disabledAfterCurrentDate" />
</template>
```

```js
<script setup>
const disabledAfterCurrentDate = (date) => {
  const timestamp = date.getTime();
  if (timestamp > new Date(2022, 0, 15).getTime()) {
    return true;
  }

  return false;
};
</script>
```

### 禁用指定日期

```html
<template>
  <vue-hash-calendar :disabled-date="disabledDate" />
</template>
```

```js
<script setup>
const disabledDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const currDate = `${year}/${month}/${day}`;
  // 生成一些需要被禁用的本月日期
  const disabledDateArr = [
    `2022/0/1`,
    `2022/0/5`,
    `2022/0/10`,
    `2022/0/15`,
    `2022/0/20`,
    `2022/0/25`,
    `2022/0/28`,
    `2022/0/16`,
    `2022/0/18`,
  ];
  if (disabledDateArr.includes(currDate)) {
    return true;
  }

  return false;
};
</script>
```
