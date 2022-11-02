<template>
  <button @click="change">切换主题色</button>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    :theme-color="themeColor"
  />
</template>

<script setup>
import VueHashCalendar from '../../calendar';
import { ref } from 'vue';

const themeColor = ref({});

const change = () => {
  themeColor.value = {
    'main-color': 'red',
    'bg-color': 'grey',
    'main-font-color': 'blue',
    'vice-font-color': 'green',
    'disabled-bg-color': 'black',
    'disabled-font-color': 'yellow',
  };
};
</script>