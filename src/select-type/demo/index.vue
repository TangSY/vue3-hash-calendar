<template>
  <h1 class="hash-demo-title">single</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    select-type="single"
  />

  <h1 class="hash-demo-title">range</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    @change="rangeChange"
    select-type="range"
  />

  <h1 class="hash-demo-title">multiple</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    @change="multiChange"
    select-type="multiple"
  />
</template>

<script setup>
import VueHashCalendar from '../../calendar';

const rangeChange = (date) => {
  console.log('rangeChange-date', date);
};

const multiChange = (date) => {
  console.log('multiChange-date', date);
};
</script>