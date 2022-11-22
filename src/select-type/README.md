# select-type

### 介绍

选择器类型

single：单选

range：范围选择

multiple：多选

### single

```html
<template>
  <vue-hash-calendar select-type="single" />
</template>
```

### range

若 `range` 类型需要设置默认日期，只需要传入`起始时间`和`结束时间`

```html
<template>
  <vue-hash-calendar
    select-type="range"
    :default-datetime="[new Date(2022, 0, 10), new Date(2022, 0, 14)]"
  />
</template>
```

### multiple

```html
<template>
  <vue-hash-calendar
    select-type="multiple"
    :default-datetime="[
      new Date(2022, 0, 4),
      new Date(2022, 0, 5),
      new Date(2022, 0, 6),
      new Date(2022, 0, 12),
      new Date(2022, 0, 18),
      new Date(2022, 0, 19),
      new Date(2022, 0, 20),
    ]"
  />
</template>
```
