<template>
  <h1 class="hash-demo-title">禁用2点2分之后的时间</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    picker-type="time"
    :disabled-time="disabledBeforeTime"
  />
</template>

<script setup>
import VueHashCalendar from '../../calendar';

const disabledBeforeTime = (date) => {
  const hours = date.getHours();
  const minute = date.getMinutes();

  if (hours > 2 || (hours === 2 && minute > 2)) {
    return true;
  }
  return false;
};
</script>