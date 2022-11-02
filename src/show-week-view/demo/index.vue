<template>
  <button @click="toggle">点击切换视图</button>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    :show-week-view="isShow"
  />
</template>

<script setup>
import { ref } from 'vue';
import VueHashCalendar from '../../calendar';

const isShow = ref(false);

const toggle = () => {
  isShow.value = !isShow.value;
  console.log('isShow.value', isShow.value);
};
</script>