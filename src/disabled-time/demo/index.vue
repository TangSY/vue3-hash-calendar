<template>
  <h1 class="hash-demo-title">禁用现在之前的时间</h1>
  <vue-hash-calendar picker-type="time" :disabled-time="disabledBeforeTime" />
</template>

<script setup>
import VueHashCalendar from '../../calendar';

const disabledBeforeTime = (date) => {
  const hours = date.getHours();
  const minute = date.getMinutes();
  const hoursNow = new Date().getHours();
  const minuteNow = new Date().getMinutes();

  if (hours < hoursNow || (hours === hoursNow && minute < minuteNow)) {
    return true;
  }
  return false;
};
</script>