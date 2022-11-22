<template>
  <h1 class="hash-demo-title">single</h1>
  <vue-hash-calendar
    select-type="single"
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
  />

  <h1 class="hash-demo-title">range</h1>
  <vue-hash-calendar
    :default-year-month="{ year: 2022, month: 0 }"
    :default-datetime="[new Date(2022, 0, 10), new Date(2022, 0, 14)]"
    allow-same-day
    @change="change"
    select-type="range"
  />

  <h1 class="hash-demo-title">multiple</h1>
  <vue-hash-calendar
    :default-year-month="{ year: 2022, month: 0 }"
    :default-datetime="[
      new Date(2022, 0, 4),
      new Date(2022, 0, 5),
      new Date(2022, 0, 6),
      new Date(2022, 0, 12),
      new Date(2022, 0, 18),
      new Date(2022, 0, 19),
      new Date(2022, 0, 20),
    ]"
    select-type="multiple"
  />
</template>

<script setup>
import VueHashCalendar from '../../calendar';

const change = (date) => {
  console.log('date', date);
};
</script>