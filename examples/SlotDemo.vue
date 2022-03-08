<template>
  <div class="body">
    <button @click="showCalendarDialog">显示</button>
    <vue-hash-calendar
      model="dialog"
      v-model:visible="isShowCalendar"
      v-model:is-show-week-view="isShowWeekView"
    >
      <template v-slot:day="scope">
        <div v-if="scope?.extendAttr?.isToday">今</div>
        <div v-else>{{ scope?.date?.day }}</div>
      </template>
    </vue-hash-calendar>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isShowCalendar = ref(true);
const isShowWeekView = ref(true);

const showCalendarDialog = () => {
  // 显示日历
  isShowCalendar.value = true;
};
</script>