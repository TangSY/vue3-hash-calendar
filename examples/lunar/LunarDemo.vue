<template>
  <div class="body">
    <button @click="showCalendarDialog">显示</button>
    <vue-hash-calendar
      model="dialog"
      v-model:visible="isShowCalendar"
      v-model:is-show-week-view="isShowWeekView"
    >
      <template v-slot:day="scope">
        <div class="lunar-content">
          <div>{{ scope?.date.day }}</div>
          <div class="lunar">{{ showLunar(scope?.date) }}</div>
        </div>
      </template>
    </vue-hash-calendar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { lunar } from "./lunar";

const isShowCalendar = ref(true);
const isShowWeekView = ref(true);

const showCalendarDialog = () => {
  // 显示日历
  isShowCalendar.value = true;
};

const showLunar = (date) => {
  if (!date) return;

  const lunarObj = lunar.solar2lunar(date.year, date.month, date.day);

  return lunarObj.festival || lunarObj.lunarFestival || lunarObj.IDayCn;
};
</script>

<style lang="stylus" scoped>
.lunar-content {
  display: flex;
  align-items: center;
  flex-direction: column;

  .lunar {
    font-size: 12px;
    transform: scale(0.8);
    width: 10vw;
    text-align: center;
  }
}
</style>