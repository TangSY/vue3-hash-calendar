<template>
  <vue-hash-calendar show-arrow>
    <template v-slot:arrow="scope">
      <div>{{ scope?.isShowWeek ? '展开' : '收起' }}</div>
    </template>
  </vue-hash-calendar>
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>