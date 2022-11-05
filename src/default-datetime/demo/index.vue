<template>
  <h1 class="hash-demo-title">2022/01/01 01:01</h1>
  <vue-hash-calendar :default-datetime="new Date(2022, 0, 1, 1, 1)" />

  <h1 class="hash-demo-title">2021/01/01 01:01</h1>
  <vue-hash-calendar :default-datetime="new Date('2021/01/01 01:01')" />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>