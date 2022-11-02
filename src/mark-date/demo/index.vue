<template>
  <h1 class="hash-demo-title">默认标记方式</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
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

  <h1 class="hash-demo-title">自定义颜色</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
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

  <h1 class="hash-demo-title">自定义标记类型</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
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

  <h1 class="hash-demo-title">交叉使用</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
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
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>