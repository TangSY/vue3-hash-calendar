<template>
  <h1 class="hash-demo-title">当前时间</h1>
  <vue-hash-calendar :default-datetime="new Date()" />

  <h1 class="hash-demo-title">2022/11/05 22:22:22</h1>
  <vue-hash-calendar :default-datetime="new Date('2022/11/05  22:22:22')" />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>