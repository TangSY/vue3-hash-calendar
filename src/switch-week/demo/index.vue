<template>
  <button @click="lastWeek">上一星期</button>
  <button @click="nextWeek">下一星期</button>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    ref="calendar"
    :show-week-view="true"
  />
</template>

<script setup>
import { ref } from 'vue';
import VueHashCalendar from '../../calendar';

const calendar = ref(null);

const lastWeek = () => {
  calendar.value.lastWeek();
};
const nextWeek = () => {
  calendar.value.nextWeek();
};
</script>