<template>
  <input type="text" v-model="date" />
  <button @click="reset">重置</button>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    ref="calendar"
  />
</template>

<script setup>
import { ref } from 'vue';
import VueHashCalendar from '../../calendar';

const calendar = ref(null);
const date = ref('2018/08/08 08:08');

const reset = () => {
  calendar.value.reset(new Date(date.value));
};
</script>