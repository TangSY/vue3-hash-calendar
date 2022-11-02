<template>
  <h1 class="hash-demo-title">datetime</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    picker-type="datetime"
  />

  <h1 class="hash-demo-title">date</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    picker-type="date"
  />

  <h1 class="hash-demo-title">time</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    picker-type="time"
  />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>