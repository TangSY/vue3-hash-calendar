# arrow 插槽

### 介绍

自定义周月切换指示箭头

参数为 { isShowWeek: boolean }

### 代码演示

```html
<template>
  <vue-hash-calendar show-arrow>
    <template #arrow="scope">
      <div>{{ scope?.isShowWeek ? '展开' : '收起' }}</div>
    </template>
  </vue-hash-calendar>
</template>
```
