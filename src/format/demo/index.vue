<template>
  <div class="hash-notify">请打开控制台（F12）查看Demo事件返回结果</div>
  <h1 class="hash-demo-title">YY/MM/DD hh:mm</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    format="YY/MM/DD hh:mm"
    @change="handleChange"
  />

  <h1 class="hash-demo-title">MM DD,YY at hh:mm F</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    format="MM DD,YY at hh:mm F"
    @change="handleChange"
  />

  <h1 class="hash-demo-title">YY 年 MM 月第 DD 天，当前时间 hh 时 mm 分</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    format="YY 年 MM 月第 DD 天，当前时间 hh 时 mm 分"
    @change="handleChange"
  />
</template>

<script setup>
import VueHashCalendar from '../../calendar';

const handleChange = (val) => {
  console.log(val);
};
</script>