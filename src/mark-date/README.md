# mark-date

### 介绍

需要被标记的日期，可按不同颜色不同标记类型分组标记（不分组默认蓝色）。标记类型取值：[MarkType](#mark-type)

### 默认标记方式

```html
<vue-hash-calendar
  :mark-date="[
      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/01`,
      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/05`,
      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/10`,
      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/15`,
      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/20`,
      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/25`,
      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/28`,
      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/16`,
      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/18`,
    ]"
/>
```

### 自定义颜色

```html
<vue-hash-calendar
  :mark-date="[
      {
        color: '#f00',
        date: [
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/01`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/05`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/10`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/15`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/20`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/25`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/28`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/16`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/18`,
        ],
      },
    ]"
/>
```

### 自定义标记类型

```html
<vue-hash-calendar
  :mark-date="[
      {
        type: 'circle',
        date: [
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/01`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/05`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/10`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/15`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/20`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/25`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/28`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/16`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/18`,
        ],
      },
    ]"
/>
```

### 交叉使用

```html
<vue-hash-calendar
  :mark-date="[
      {
        color: '#f00',
        type: 'dot+circle',
        date: [
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/01`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/05`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/10`,
        ],
      },
      {
        color: '#0f0',
        type: 'circle',
        date: [
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/15`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/20`,
          `${new Date().getFullYear()}/${new Date().getMonth() + 1}/25`,
        ],
      },
      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/28`,
      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/16`,
      `${new Date().getFullYear()}/${new Date().getMonth() + 1}/18`,
    ]"
/>
```
