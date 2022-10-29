<template>
  <h1 class="hash-demo-title">false</h1>
  <vue-hash-calendar :change-year-fast="false" />

  <h1 class="hash-demo-title">true</h1>
  <vue-hash-calendar :change-year-fast="true" />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>