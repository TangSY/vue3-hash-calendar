<template>
  <h1 class="hash-demo-title">left</h1>
  <vue-hash-calendar disabled-scroll="left" />

  <h1 class="hash-demo-title">horizontal</h1>
  <vue-hash-calendar disabled-scroll="horizontal" />

  <h1 class="hash-demo-title">vertical</h1>
  <vue-hash-calendar disabled-scroll="vertical" />

  <h1 class="hash-demo-title">true</h1>
  <vue-hash-calendar :disabled-scroll="true" />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>