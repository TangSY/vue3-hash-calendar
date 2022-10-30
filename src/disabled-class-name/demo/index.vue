<template>
  <vue-hash-calendar
    disabled-class-name="disabled-class-name"
    :disabled-date="disabledAfterCurrentDate"
  />
</template>

<script setup>
import VueHashCalendar from '../../calendar';

const disabledAfterCurrentDate = (date) => {
  const timestamp = date.getTime();
  if (timestamp > new Date().getTime()) {
    return true;
  }

  return false;
};
</script>

<style>
.disabled-class-name {
  color: blue;
  background: red;
}
</style>