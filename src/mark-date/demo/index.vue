<template>
  <h1 class="hash-demo-title">默认标记方式</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    :mark-date="[
      `2022/01/01`,
      `2022/01/05`,
      `2022/01/10`,
      `2022/01/15`,
      `2022/01/20`,
      `2022/01/25`,
      `2022/01/28`,
      `2022/01/16`,
      `2022/01/18`,
    ]"
  />

  <h1 class="hash-demo-title">自定义颜色</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    :mark-date="[
      {
        color: '#f00',
        date: [
          `2022/01/01`,
          `2022/01/05`,
          `2022/01/10`,
          `2022/01/15`,
          `2022/01/20`,
          `2022/01/25`,
          `2022/01/28`,
          `2022/01/16`,
          `2022/01/18`,
        ],
      },
    ]"
  />

  <h1 class="hash-demo-title">自定义标记类型</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    :mark-date="[
      {
        type: 'circle',
        date: [
          `2022/01/01`,
          `2022/01/05`,
          `2022/01/10`,
          `2022/01/15`,
          `2022/01/20`,
          `2022/01/25`,
          `2022/01/28`,
          `2022/01/16`,
          `2022/01/18`,
        ],
      },
    ]"
  />

  <h1 class="hash-demo-title">交叉使用</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    :mark-date="[
      {
        color: '#f00',
        type: 'dot+circle',
        date: [`2022/01/01`, `2022/01/05`, `2022/01/10`],
      },
      {
        color: '#0f0',
        type: 'circle',
        date: [`2022/01/15`, `2022/01/20`, `2022/01/25`],
      },
      `2022/01/28`,
      `2022/01/16`,
      `2022/01/18`,
    ]"
  />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>