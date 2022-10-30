<template>
  <vue-hash-calendar today-class-name="today-class-name" />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>

<style>
.hash-calendar .today-class-name {
  color: blue;
  background: red;
}
</style>