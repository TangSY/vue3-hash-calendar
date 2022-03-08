<template>
  <div class="body">
    <vue-hash-calendar
      @touchstart="touchStart"
      @touchmove="touchMove"
      @slidechange="slideChange"
      @touchend="touchEnd"
    >
    </vue-hash-calendar>
  </div>
</template>

<script setup lang="ts">
const touchStart = (event: Event) => {
  // 监听手指开始滑动事件
  console.log(event, "start");
};

const touchMove = (event: Event) => {
  // 监听手指开始滑动事件
  console.log(event, "move");
};

const touchEnd = (event: Event) => {
  // 监听手指开始滑动事件
  console.log(event, "end");
};

const slideChange = (direction: string) => {
  // 滑动方向改变
  console.log(direction, "direction");
};
</script>

