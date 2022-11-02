<template>
  <h1 class="hash-demo-title">true</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    :show-not-current-month-day="true"
  />

  <h1 class="hash-demo-title">false</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    :show-not-current-month-day="false"
  />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>