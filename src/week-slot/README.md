# week 插槽

### 介绍

自定义星期栏显示的内容

参数为 { week: string }

### 代码演示

```html
<template>
  <vue-hash-calendar>
    <template v-slot:week="scope">
      <div>{{ `|${scope?.week}|` }}</div>
    </template>
  </vue-hash-calendar>
</template>
```
