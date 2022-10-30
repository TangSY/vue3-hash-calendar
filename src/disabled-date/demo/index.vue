<template>
  <h1 class="hash-demo-title">禁用当前时间之后的所有日期</h1>
  <vue-hash-calendar :disabled-date="disabledAfterCurrentDate" />

  <h1 class="hash-demo-title">禁用指定日期</h1>
  <vue-hash-calendar :disabled-date="disabledDate" />
</template>

<script setup>
import VueHashCalendar from '../../calendar';

const disabledAfterCurrentDate = (date) => {
  const timestamp = date.getTime();
  if (timestamp > new Date().getTime()) {
    return true;
  }

  return false;
};

const disabledDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const currDate = `${year}/${month}/${day}`;
  const disabledDateArr = [
    `${new Date().getFullYear()}/${new Date().getMonth()}/1`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/5`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/10`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/15`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/20`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/25`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/28`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/16`,
    `${new Date().getFullYear()}/${new Date().getMonth()}/18`,
  ];
  if (disabledDateArr.includes(currDate)) {
    return true;
  }

  return false;
};
</script>