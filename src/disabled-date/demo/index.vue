<template>
  <h1 class="hash-demo-title">禁用 2022年1月15号 之后的所有日期</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    :disabled-date="disabledAfterCurrentDate"
  />

  <h1 class="hash-demo-title">禁用指定日期</h1>
  <vue-hash-calendar
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    :disabled-date="disabledDate"
  />
</template>

<script setup>
import VueHashCalendar from '../../calendar';

const disabledAfterCurrentDate = (date) => {
  const timestamp = date.getTime();
  if (timestamp > new Date(2022, 0, 15).getTime()) {
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
    `2022/0/1`,
    `2022/0/5`,
    `2022/0/10`,
    `2022/0/15`,
    `2022/0/20`,
    `2022/0/25`,
    `2022/0/28`,
    `2022/0/16`,
    `2022/0/18`,
  ];
  if (disabledDateArr.includes(currDate)) {
    return true;
  }

  return false;
};
</script>