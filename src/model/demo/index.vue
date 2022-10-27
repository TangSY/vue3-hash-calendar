<template>
  <h1 class="demo-title">inline</h1>
  <vue-hash-calendar model="inline" />

  <h1 class="demo-title">dialog</h1>
  <button @click="showCalendar">点击打开日历弹窗</button>
  <vue-hash-calendar model="dialog" v-model:visible="isShow" />
</template>

<script setup>
import { ref } from 'vue';
import VueHashCalendar from '../../calendar';

const isShow = ref(false);

const showCalendar = () => {
  isShow.value = true;
};
</script>

<style>
.demo-title {
  margin: 24px;
}
</style>