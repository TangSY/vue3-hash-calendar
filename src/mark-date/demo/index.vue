<template>
  <h1 class="hash-demo-title">默认</h1>
  <vue-hash-calendar
    :mark-date="[
      '2022/11/11',
      '2022/12/11',
      '2023/01/11',
      '2023/02/11',
      '2023/03/11',
      '2023/04/11',
      '2023/05/11',
    ]"
  />

  <h1 class="hash-demo-title">自定义颜色</h1>
  <vue-hash-calendar
    :mark-date="[
      {
        color: '#f00',
        date: [
          '2022/11/11',
          '2022/12/11',
          '2023/01/11',
          '2023/02/11',
          '2023/03/11',
          '2023/04/11',
          '2023/05/11',
        ],
      },
    ]"
  />

  <h1 class="hash-demo-title">自定义标记类型</h1>
  <vue-hash-calendar
    :mark-date="[
      {
        type: 'dot',
        date: [
          '2022/11/11',
          '2022/12/11',
          '2023/01/11',
          '2023/02/11',
          '2023/03/11',
          '2023/04/11',
          '2023/05/11',
        ],
      },
    ]"
  />

  <h1 class="hash-demo-title">交叉使用</h1>
  <vue-hash-calendar
    :mark-date="[
      {
        color: '#f00',
        type: 'dot+circle',
        date: ['2022/11/11', '2022/12/11', '2023/04/11'],
      },
      {
        type: 'dot',
        date: ['2023/01/11', '2023/02/11', '2023/03/11'],
      },
      '2023/05/11',
    ]"
  />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>