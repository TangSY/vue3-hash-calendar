# disabled-date

### 介绍

设置日期的禁用状态，参数为当前日期，要求返回 Boolean （禁用该日期需返回 true）

### 禁用当前时间之后的所有日期

```html
<vue-hash-calendar :disabled-date="disabledAfterCurrentDate" />
```

```js
const disabledAfterCurrentDate = (date) => {
  const timestamp = date.getTime();
  if (timestamp > new Date().getTime()) {
    return true;
  }

  return false;
};
```

### 禁用指定日期

```html
<vue-hash-calendar :disabled-date="disabledDate" />
```

```js
const disabledDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const currDate = `${year}/${month}/${day}`;
  // 生成一些需要被禁用的本月日期
  const disabledDateArr = [
    `${new Date().getFullYear()}/${new Date().getMonth()}/1`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/5`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/10`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/15`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/20`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/25`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/28`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/16`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/18`,
  ];
  if (disabledDateArr.includes(currDate)) {
    return true;
  }

  return false;
};
```
