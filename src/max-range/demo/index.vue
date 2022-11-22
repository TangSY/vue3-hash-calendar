<template>
  <h1 class="hash-demo-title">range</h1>
  <vue-hash-calendar
    :default-year-month="{ year: 2022, month: 0 }"
    :default-datetime="null"
    :max-range="5"
    @over-range="overRange"
    select-type="range"
  />

  <h1 class="hash-demo-title">multiple</h1>
  <vue-hash-calendar
    :default-year-month="{ year: 2022, month: 0 }"
    :default-datetime="null"
    :max-range="5"
    @over-range="overRange"
    select-type="multiple"
  />
</template>

<script setup>
import VueHashCalendar from '../../calendar';

const overRange = () => {
  console.log('overRange');
};
</script>