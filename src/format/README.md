# format

### 介绍

回调事件返回的日期格式

### YY/MM/DD hh:mm

```html
<vue-hash-calendar format="YY/MM/DD hh:mm" @change="handleChange" />
```

```js
const handleChange = (val) => {
  console.log(val);
};
```

### MM DD,YY at hh:mm F

```html
<vue-hash-calendar format="MM DD,YY at hh:mm F" @change="handleChange" />
```

```js
const handleChange = (val) => {
  console.log(val);
};
```

### YY 年 MM 月第 DD 天，当前时间 hh 时 mm 分

```html
<vue-hash-calendar
  format="YY 年 MM 月第 DD 天，当前时间 hh 时 mm 分"
  @change="handleChange"
/>
```

```js
const handleChange = (val) => {
  console.log(val);
};
```
