<template>
  <vue-hash-calendar
    first-day-of-month-class-name="first-day-of-month-class-name"
  />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>

<style>
.first-day-of-month-class-name {
  color: blue;
  background: red;
}
</style>