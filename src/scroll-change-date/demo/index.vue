<template>
  <h1 class="demo-title">true</h1>
  <vue-hash-calendar :scroll-change-date="true" />
  <h1 class="demo-title">false</h1>
  <vue-hash-calendar :scroll-change-date="false" />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>
