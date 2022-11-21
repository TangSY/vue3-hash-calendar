# picker-type

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

```html
<template>
  <vue-hash-calendar
    select-type="range"
    :default-datetime="[
      new Date(new Date().setDate(14)),
      new Date(new Date().setDate(18)),
    ]"
  />
</template>
```

### multiple

```html
<template>
  <vue-hash-calendar
    select-type="multiple"
    :default-datetime="[
      new Date(new Date().setDate(8)),
      new Date(new Date().setDate(9)),
      new Date(new Date().setDate(10)),
      new Date(new Date().setDate(16)),
      new Date(new Date().setDate(22)),
      new Date(new Date().setDate(23)),
      new Date(new Date().setDate(24)),
    ]"
  />
</template>
```
