<template>
  <ul
    class="calendar_group_ul"
    ref="containerRef"
    :style="{ transform: `translate3d(${-translateIndex * 100}%, 0, 0)` }"
    @touchstart="touchStart"
    @touchmove.stop.prevent="touchMove"
    @touchend="touchEnd"
  >
    <li
      class="calendar_group_li"
      v-for="(item, i) in calendarData"
      :key="i"
      :style="{
        transform: `translate3d(${
          (i - 1 + translateIndex + (isTouching ? touch.x : 0)) * 100
        }%, ${calendarY}px, 0)`,
        transitionDuration: `${isTouching ? 0 : transitionDuration}s`,
      }"
    >
      <slot :currArr="item"></slot>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { scrollContainerProps } from "./ScrollContainer";
import type { ScorllDireType } from "./ScrollContainer";

defineOptions({ name: "ScrollContainer" });

const props = defineProps(scrollContainerProps);

const emit = defineEmits([
  "slidechange",
  "touchstart",
  "touchmove",
  "touchend",
]);

const containerRef = ref<HTMLDivElement>();
const translateIndex = ref(0);
const transitionDuration = ref(0.3);
const touch = ref({
  x: 0,
  y: 0,
});
const isTouching = ref(false);
const touchStartPositionX = ref(0);
const touchStartPositionY = ref(0);
const calendarY = ref(0);

// 监听手指开始滑动事件
const touchStart = (event: TouchEvent) => {
  emit("touchstart", event);

  touchStartPositionX.value = event.touches[0].clientX;
  touchStartPositionY.value = event.touches[0].clientY;
  touch.value = {
    x: 0,
    y: 0,
  };
  isTouching.value = true;
};

// 监听手指移动事件
const touchMove = (event: TouchEvent) => {
  emit("touchmove", event);

  let moveX = event.touches[0].clientX - touchStartPositionX.value;
  let moveY = event.touches[0].clientY - touchStartPositionY.value;
  if (Math.abs(moveX) > Math.abs(moveY)) {
    touch.value = {
      x: moveX / containerRef.value?.offsetWidth,
      y: 0,
    };
  } else {
    touch.value = {
      x: 0,
      y: moveY / containerRef.value?.offsetHeight,
    };
  }

  setDisabledScrollDirection();
};

// 监听touch结束事件
const touchEnd = (e: TouchEvent) => {
  emit("touchend", e);

  isTouching.value = false;
  if (
    Math.abs(touch.value.x) > Math.abs(touch.value.y) &&
    Math.abs(touch.value.x) > 0.2
  ) {
    if (touch.value.x > 0) {
      emit("slidechange", "right");

      translateIndex.value += 1;
    } else if (touch.value.x < 0) {
      emit("slidechange", "left");

      translateIndex.value -= 1;
    }
  }
  if (
    Math.abs(touch.value.y) > Math.abs(touch.value.x) &&
    Math.abs(touch.value.y * containerRef.value?.offsetHeight) > 50
  ) {
    if (touch.value.y > 0) {
      emit("slidechange", "down");
    } else if (touch.value.y < 0) {
      emit("slidechange", "up");
    }
  } else {
    touch.value = {
      x: 0,
      y: 0,
    };
  }
};

// 是否可以滑动
const isCanScroll = (dire: ScorllDireType) => {
  const scrollObj = {
    up: [true, "up", "vertical"],
    down: [true, "down", "vertical"],
    left: [true, "left", "horizontal"],
    right: [true, "right", "horizontal"],
  };

  let checkedScrollArr = scrollObj[dire];
  return !checkedScrollArr.some((item) => item === props.disabledScroll);
};

// 设置禁止滑动的方向
const setDisabledScrollDirection = () => {
  touch.value.x < 0 && !isCanScroll("left") && (touch.value.x = 0);
  touch.value.x > 0 && !isCanScroll("right") && (touch.value.x = 0);
  touch.value.y < 0 && !isCanScroll("up") && (touch.value.y = 0);
  touch.value.y > 0 && !isCanScroll("down") && (touch.value.y = 0);
};
</script>

<style lang="stylus" scoped>
@import '../style/common.styl';

.calendar_group_ul {
  height: 100%;
  width: 100%;
  background: white;
}

.calendar_group_li {
  position: absolute;
  top: 0;
  left: px2vw(4px);
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  flexAlign();
  flex-wrap: wrap;
  background: white;
  will-change: transform;
}
</style>