<template>
  <div class="time_body" v-show="show">
    <div class="time_group">
      <div
        class="time_content"
        :id="hashID[index]"
        v-for="(item, index) in timeArray"
        :key="index"
        @touchstart="timeTouchStart"
        @touchmove="timeTouchMove($event, index)"
        @touchend="timeTouchEnd($event, index)"
      >
        <div
          class="time_item"
          :class="[
            { time_item_show: isBeSelectedTime(time, index) },
            hashClass,
            { 'time-disabled': formatDisabledDate(time, index) },
          ]"
          v-for="(time, j) in item"
          :key="index + j"
        >
          {{ fillNumber(time) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, reactive, ref, watch } from "vue";
import { checkPlatform } from "../utils/util";
import { TimePickerProps } from "./TimePicker";

defineOptions({
  name: "TimePicker",
});

const props = defineProps(TimePickerProps);

const emit = defineEmits(["change"]);

const hashID = ref([]);
const hashClass = ref("");
const checkedDate = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
});
const timeHeight = ref(0);
const timeArray = ref([]);
const timeStartY = ref(0);
const timeStartUp = ref(0);

hashID.value = [
  `time${parseInt(Math.random() * 1000000)}`,
  `time${parseInt(Math.random() * 1000000)}`,
];
hashClass.value = `time_item_${parseInt(Math.random() * 1000000)}`;

// 小于10，在前面补0
const fillNumber = (val) => {
  return val > 9 ? val : "0" + val;
};

// 初始化时间选择器数据
const initTimeArray = () => {
  let hours = [];
  timeArray.value = [];
  for (let i = 0; i < 24; i++) {
    hours.push(i);
  }
  let minutes = [];
  for (let i = 0; i < 60; i++) {
    if (i % props.minuteStep === 0) {
      minutes.push(i);
    }
  }
  timeArray.value.push(hours, minutes);

  nextTick(() => {
    let checkHours = checkedDate.value.hours;
    let checkMinutes = checkedDate.value.minutes;

    const timeHeightStr =
      getComputedStyle(document.querySelector(`.${hashClass.value}`)).height ||
      "";
    timeHeight.value = parseFloat(timeHeightStr.split("px")[0]);

    let hoursUp = (2 - parseFloat(checkHours)) * timeHeight.value;
    let minutesUp =
      (2 - parseFloat(checkMinutes) / props.minuteStep) * timeHeight.value;
    document.querySelector(`#${hashID.value[0]}`).style.webkitTransform =
      "translate3d(0px," + hoursUp + "px,0px)";
    document.querySelector(`#${hashID.value[1]}`).style.webkitTransform =
      "translate3d(0px," + minutesUp + "px,0px)";
  });
};

const formatDisabledDate = (time, index) => {
  let hours = index === 0 ? time : checkedDate.value.hours;
  let minutes = index === 1 ? time : checkedDate.value.minutes;
  let dateStr = `${props.calendarDate.year}/${props.calendarDate.month + 1}/${
    props.calendarDate.day
  } ${hours}:${minutes}`;
  let fDate = new Date(dateStr);

  return props.disabledTime(fDate);
};

const timeTouchStart = (e) => {
  e.preventDefault();
  timeStartY.value = e.changedTouches[0].pageY;
  let transform = e.currentTarget.style.webkitTransform;
  if (transform) {
    timeStartUp.value = parseFloat(transform.split(" ")[1].split("px")[0]);
  }
};

const timeTouchMove = (e, index) => {
  let moveEndY = e.changedTouches[0].pageY;
  let Y = moveEndY - timeStartY.value;

  e.currentTarget.style.webkitTransform =
    "translate3d(0px," + (Y + timeStartUp.value) + "px,0px)";

  if (checkPlatform() === "2") {
    timeTouchEnd(e, index);
    return false;
  }
};

const timeTouchEnd = (e, index) => {
  let transform = e.currentTarget.style.webkitTransform;
  let endUp = timeStartUp.value;
  if (transform) {
    endUp = parseFloat(
      e.currentTarget.style.webkitTransform.split(" ")[1].split("px")[0]
    );
  }

  let distance = Math.abs(endUp - timeStartUp.value);
  let upCount = Math.floor(distance / timeHeight.value) || 1;
  let halfWinWith = timeHeight.value / 2;
  let up = timeStartUp.value;

  if (endUp <= timeStartUp.value) {
    // 向上滑动 未过临界值
    if (distance <= halfWinWith) {
      up = timeStartUp.value;
    } else {
      up = timeStartUp.value - timeHeight.value * upCount;
      if (up < -(timeArray.value[index].length - 3) * timeHeight.value) {
        up = -(timeArray.value[index].length - 3) * timeHeight.value;
      }
    }
  } else {
    // 向下滑动 未过临界值
    if (distance <= halfWinWith) {
      up = timeStartUp.value;
    } else {
      up = timeStartUp.value + timeHeight.value * upCount;
      if (up > timeHeight.value * 2) {
        up = timeHeight.value * 2;
      }
    }
  }
  if (index === 0) {
    let hour = 2 - Math.round(parseFloat(up) / parseFloat(timeHeight.value));

    if (formatDisabledDate(hour, index)) {
      up = timeStartUp.value;
    } else {
      checkedDate.value.hours = hour;
    }
  } else {
    let minute = 2 - Math.round(parseFloat(up) / parseFloat(timeHeight.value));

    if (formatDisabledDate(minute, index)) {
      up = timeStartUp.value;
    } else {
      checkedDate.value.minutes = minute * props.minuteStep;
    }
  }
  e.currentTarget.style.webkitTransition = "transform 300ms";
  e.currentTarget.style.webkitTransform = "translate3d(0px," + up + "px,0px)";
};

const isBeSelectedTime = (time, index) => {
  // 是否为当前选中的时间
  return (
    (index === 0 && time === checkedDate.value.hours) ||
    (index === 1 && time === checkedDate.value.minutes)
  );
};

// 校验时间范围
const checkTimeRange = (range) => {
  if (!range) return;
  let timeArr = range.split("-");
  if (timeArr.length === 0 || timeArr.length > 2) return false;

  return timeArr.every((time) => {
    let mhArr = time.split(":");
    if (mhArr.length === 0 || mhArr.length > 2) return false;

    // 校验单个时间是否符合规范 00:00 - 24:00
    if (parseInt(mhArr[0]) < 0 || parseInt(mhArr[0]) > 24) return false;
    if (parseInt(mhArr[1]) < 0 || parseInt(mhArr[1]) > 59) return false;
    if (parseInt(mhArr[0]) === 24 && parseInt(mhArr[1]) > 0) return false;
    return true;
  });
};

watch(
  () => props.defaultTime,
  (val) => {
    if (!(val instanceof Date)) {
      throw new Error(
        "The calendar component's defaultTime must be date type!"
      );
    }
    checkedDate.value.hours = val.getHours();
    checkedDate.value.minutes = val.getMinutes();
  },
  { immediate: true }
);

watch(
  checkedDate,
  (val) => {
    emit("change", val);
  },
  { deep: true, immediate: true }
);

watch(
  () => props.show,
  (val) => {
    if (val) {
      initTimeArray();
    }
  },
  { immediate: true }
);

watch(
  () => props.minuteStep,
  (val) => {
    if (val <= 0 || val >= 60) {
      throw new Error(`The minutes-step can't be: ${val}!`);
    }
    if (60 % val !== 0) {
      throw new Error("The minutes-step must be divided by 60!");
    }
  },
  { immediate: true }
);

watch(
  () => props.selectableRange,
  (val) => {
    if (!val) return;
    let formatPass = false;
    if (typeof val === "string") {
      formatPass = checkTimeRange(val);
    } else if (val instanceof Array) {
      formatPass = val.every((item) => checkTimeRange(item));
    }
    if (!formatPass) throw new Error("The format of selectableRange is error!");
  },
  { immediate: true }
);
</script>

<style lang="stylus" scoped>
@import '../style/common.styl';

.time_body {
  width: 100%;
  margin-top: px2vw(100px);
}

.time_group {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: px2vw(360px);
  margin-top: px2vw(100px);
  -webkit-overflow-scrolling: touch;
  overflow: hidden;
}

.time_content {
  touch-action: none;
  padding: 0 px2vw(40px);
  -webkit-overflow-scrolling: touch;
}

.time_item {
  padding: px2vw(20px) 0;
  viceFontColor(color);
}

.time_item_show {
  mainFontColor(color);
}

.time-disabled {
  background-color: #f5f7fa;
  opacity: 1;
  cursor: not-allowed;
  color: #c0c4cc;
}
</style>
