<template>
  <h1 class="hash-demo-title">true</h1>
  <vue-hash-calendar :show-today-button="true" />

  <h1 class="hash-demo-title">false</h1>
  <vue-hash-calendar :show-today-button="false" />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>