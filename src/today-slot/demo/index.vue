<template>
  <vue-hash-calendar show-arrow>
    <template #today>
      <span style="color: red">今天按钮</span>
    </template>
  </vue-hash-calendar>
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>