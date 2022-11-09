<template>
  <vue-hash-calendar>
    <template v-slot:week="scope">
      <div>{{ `|${scope?.week}|` }}</div>
    </template>
  </vue-hash-calendar>
</template>

<script setup>
import VueHashCalendar from '../../calendar';
</script>