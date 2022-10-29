<template>
  <h1 class="hash-demo-title">当前时间</h1>
  <vue-hash-calendar pick-type="time" :minute-step="2" />

  <h1 class="hash-demo-title">2022/11/05 22:22:22</h1>
  <vue-hash-calendar pick-type="time" :minute-step="5" />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>