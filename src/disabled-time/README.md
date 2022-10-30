# disabled-time

### 介绍

设置时间的禁用状态，参数为当前时间，要求返回 Boolean （禁用该时间需返回 true）

### 禁用现在之前的时间

以 `picker-type="time"` 为例

```html
<vue-hash-calendar picker-type="time" :disabled-time="disabledBeforeTime" />
```

```js
const disabledBeforeTime = (date) => {
  const hours = date.getHours();
  const minute = date.getMinutes();
  const hoursNow = new Date().getHours();
  const minuteNow = new Date().getMinutes();

  if (hours < hoursNow || (hours === hoursNow && minute < minuteNow)) {
    return true;
  }
  return false;
};
```
