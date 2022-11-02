<template>
  <h1 class="hash-demo-title">CN</h1>
  <vue-hash-calendar :default-datetime="new Date(2022, 0, 1, 1, 1)" lang="CN" />

  <h1 class="hash-demo-title">EN</h1>
  <vue-hash-calendar :default-datetime="new Date(2022, 0, 1, 1, 1)" lang="EN" />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>