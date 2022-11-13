<template>
  <div class="hash-notify">请打开控制台（F12）查看Demo事件返回结果</div>
  <button @click="showCalendar">点击打开日历弹窗</button>
  <vue-hash-calendar
    model="dialog"
    :default-datetime="new Date(2022, 0, 1, 1, 1)"
    v-model:visible="isShow"
    @click="onClick"
    @confirm="onConfirm"
    @change="onChange"
    @touchstart="onTouchstart"
    @touchmove="onTouchmove"
    @touchend="onTouchend"
    @slidechange="onSlidechange"
    @calendarTypeChange="onTypeChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import VueHashCalendar from '../../calendar';

const isShow = ref(true);

const showCalendar = () => {
  isShow.value = true;
};

const onClick = (date) => {
  console.log('onClick', date);
};

const onConfirm = (date) => {
  console.log('onConfirm', date);
};

const onChange = (date) => {
  console.log('onChange', date);
};

const onTouchstart = (date) => {
  console.log('onTouchstart', date);
};

const onTouchmove = (date) => {
  console.log('onTouchmove', date);
};

const onTouchend = (date) => {
  console.log('onTouchend', date);
};

const onSlidechange = (date) => {
  console.log('onSlidechange', date);
};

const onTypeChange = (date) => {
  console.log('onTypeChange', date);
};
</script>