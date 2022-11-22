<template>
  <h1 class="hash-demo-title">single</h1>
  <vue-hash-calendar select-type="single" />

  <h1 class="hash-demo-title">range</h1>
  <vue-hash-calendar
    :default-datetime="[
      new Date(new Date().setDate(14)),
      new Date(new Date().setDate(18)),
    ]"
    allow-same-day
    @change="change"
    select-type="range"
  />

  <h1 class="hash-demo-title">multiple</h1>
  <vue-hash-calendar
    :default-datetime="[
      new Date(new Date().setDate(8)),
      new Date(new Date().setDate(9)),
      new Date(new Date().setDate(10)),
      new Date(new Date().setDate(16)),
      new Date(new Date().setDate(22)),
      new Date(new Date().setDate(23)),
      new Date(new Date().setDate(24)),
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