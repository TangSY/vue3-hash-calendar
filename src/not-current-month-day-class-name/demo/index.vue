<template>
  <vue-hash-calendar
    not-current-month-day-class-name="not-current-month-day-class-name"
  />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>

<style>
.not-current-month-day-class-name {
  color: blue;
  background: red;
}
</style>