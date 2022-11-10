<template>
  <vue-hash-calendar model="dialog" :visible="true">
    <template #confirm>
      <span style="color: red">确定按钮</span>
    </template>
  </vue-hash-calendar>
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>