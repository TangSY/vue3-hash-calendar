<template>
  <button @click="toggle">点击切换视图</button>
  <vue-hash-calendar v-model:show-week-view="isShow" />
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