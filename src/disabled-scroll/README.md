# disabled-scroll

### 介绍

设置日历的禁止滑动方向

可选值：`'left' ｜ 'right' ｜ 'up' ｜ 'down' ｜ 'horizontal' ｜ 'vertical' ｜ true ｜ false` ，可取其一控制单个方向

其中 `true` 和 `false` 控制所有方向

### left

禁止向左滑动

```html
<template>
  <vue-hash-calendar disabled-scroll="left" />
</template>
```

### horizontal

禁止横向滑动

```html
<template>
  <vue-hash-calendar disabled-scroll="horizontal" />
</template>
```

### vertical

禁止竖向滑动

```html
<template>
  <vue-hash-calendar disabled-scroll="vertical" />
</template>
```

### true

禁止所有方向的滑动

```html
<template>
  <vue-hash-calendar :disabled-scroll="true" />
</template>
```
