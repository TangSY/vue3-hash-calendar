<template>
  <h1 class="hash-demo-title">2022/01/01 01:01</h1>
  <vue-hash-calendar :default-datetime="new Date(2022, 0, 1, 1, 1)" />

  <h1 class="hash-demo-title">2022/10/01 22:22:22</h1>
  <vue-hash-calendar :default-datetime="new Date('2022/10/01  22:22:22')" />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>