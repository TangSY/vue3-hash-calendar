<template>
  <button @click="today">返回今日</button> <vue-hash-calendar ref="calendar" />
</template>

<script setup>
import { ref } from 'vue';
import VueHashCalendar from '../../calendar';

const calendar = ref(null);

const today = () => {
  calendar.value.today();
};
</script>