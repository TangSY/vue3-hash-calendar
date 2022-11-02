<template>
  <h1 class="hash-demo-title">修改当天的日期为 今</h1>
  <vue-hash-calendar :default-datetime="new Date(2022, 0, 1, 1, 1)">
    <template v-slot:day="scope">
      <div v-if="scope?.extendAttr?.isToday">今</div>
      <div v-else>{{ scope?.date?.day }}</div>
    </template>
  </vue-hash-calendar>

  <h1 class="hash-demo-title">农历</h1>
  <vue-hash-calendar :default-datetime="new Date(2022, 0, 1, 1, 1)">
    <template v-slot:day="scope">
      <div class="lunar-content">
        <div>{{ scope?.date.day }}</div>
        <div class="lunar">{{ showLunar(scope?.date) }}</div>
      </div>
    </template>
  </vue-hash-calendar>
</template>

<script setup>
import VueHashCalendar from '../../calendar';
import { lunar } from './lunar';

const showLunar = (date) => {
  if (!date || !date.day) return;

  const lunarObj = lunar.solar2lunar(date.year, date.month + 1, date.day);

  return lunarObj.festival || lunarObj.lunarFestival || lunarObj.IDayCn;
};
</script>

<style>
.lunar-content {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.lunar {
  font-size: 12px;
  transform: scale(0.8);
  width: 10vw;
  text-align: center;
}
</style>