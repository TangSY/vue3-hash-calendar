<template>
  <h1 class="demo-title">当前时间</h1>
  <vue-hash-calendar :default-datetime="new Date()" />

  <h1 class="demo-title">2022/11/05</h1>
  <vue-hash-calendar :default-datetime="new Date(2022 / 11 / 05)" />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>

<style>
.demo-title {
  margin: 24px;
}
</style>