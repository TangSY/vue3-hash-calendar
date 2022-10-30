<template>
  <button @click="lastMonth">上一月</button>
  <button @click="nextMonth">下一月</button>
  <vue-hash-calendar ref="calendar" />
</template>

<script setup>
import { ref } from 'vue';
import VueHashCalendar from '../../calendar';

const calendar = ref(null);

const lastMonth = () => {
  calendar.value.lastMonth();
};
const nextMonth = () => {
  calendar.value.nextMonth();
};
</script>