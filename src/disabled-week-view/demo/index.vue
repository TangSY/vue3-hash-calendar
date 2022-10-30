<template>
  <h1 class="hash-demo-title">false</h1>
  <vue-hash-calendar :disabled-week-view="false" />

  <h1 class="hash-demo-title">true</h1>
  <vue-hash-calendar :disabled-week-view="true" />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>