<template>
  <button @click="showCalendar">点击打开日历弹窗</button>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    model="dialog"
    v-model:visible="isShow"
  />
</template>

<script setup>
import { ref } from 'vue';
import VueHashCalendar from '../../calendar';

const isShow = ref(false);

const showCalendar = () => {
  isShow.value = true;
};
</script>