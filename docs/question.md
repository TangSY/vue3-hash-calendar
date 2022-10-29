# 常见问题

### 如何添加农历？

```js
https://github.com/TangSY/vue3-hash-calendar/blob/main/examples/lunar/LunarDemo.vue
```

### 在 dialog 模式中，如何显示日历组件

```js
<vue-hash-calendar v-model:visible="isShowCalendar"></vue-hash-calendar>;

//设置为true
this.isShowCalendar = true;
```

### cdn 方式引入的组件，为什么有些属性不起作用？

```js
在非 webpack 开发模式下，属性名称不能使用驼峰命名。例如：isShowAction 需要写成 is-show-action.
```

### 想要返回标准的英文格式日期，format 属性应该怎样写

```js
<vue-hash-calendar format="MM DD,YY at hh:mm F" />
```

### 想要返回 12 小时制的日期，format 属性应该怎样写？

```js
<vue-hash-calendar format="YY/MM/DD hh:mm F" />
```

### day slot 的基本用法

```js
https://github.com/TangSY/vue3-hash-calendar/blob/main/examples/SlotDemo.vue
```

### 能否通过外部的某个按钮来触发日历的展开和收起

```js
可以在外部通过修改 showWeekView 的值来控制日历的收起与展开
```

### 如何设置禁用日期

```js
// 例如禁用今日之前的所有日期

/** vue模板文件 **/
<vue-hash-calendar :disabled-date="disabledDate"></vue-hash-calendar>

/** vue methods 中的方法 **/
disabledDate(date) {
    let timestamp = date.getTime();
    if (timestamp > new Date().getTime()) {
        return true
    }

    return false
}
```

### 如何设置禁用时间

```js
// 例如禁用现在之前的时间

/** vue模板文件 **/
<vue-hash-calendar :disabled-time="disabledTime"></vue-hash-calendar>

/** vue methods 中的方法 **/
disabledTime(date) { // 禁用的时间
  let hours = date.getHours()
  let minute = date.getMinutes()
  let hoursNow = new Date().getHours()
  let minuteNow = new Date().getMinutes()

  if (hours < hoursNow || (hours === hoursNow && minute < minuteNow)) {
    return true
  }
  return false
}
```

### 如果有其他问题， 或者功能上不兼容的。可以邮件沟通 t@tsy6.com，或者 github 提交 issue。
