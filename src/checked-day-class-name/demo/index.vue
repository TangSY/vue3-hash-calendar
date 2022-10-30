<template>
  <vue-hash-calendar checked-day-class-name="checked-day-class-name" />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>

<style>
.checked-day-class-name {
  color: blue;
  background: red;
}
</style>