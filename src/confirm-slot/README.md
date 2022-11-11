# confirm 插槽

### 介绍

自定义 `确定` 按钮文字及样式

### 代码演示

```html
<template>
  <vue-hash-calendar model="dialog" :visible="true">
    <template #confirm>
      <span style="color: red">确定按钮</span>
    </template>
  </vue-hash-calendar>
</template>
```
