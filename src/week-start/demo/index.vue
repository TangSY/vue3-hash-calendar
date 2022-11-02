<template>
  <h1 class="hash-demo-title">sunday</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    week-start="sunday"
  />

  <h1 class="hash-demo-title">monday</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    week-start="monday"
  />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>