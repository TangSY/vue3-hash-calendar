/**
* @Description:    日期、时间选择器
* @Author:         TSY
* @CreateDate:     2019/5/17 16:22
* @Email:          t@tsy6.com
*/
<template>
  <div
    class="hash-calendar"
    :class="{ calendar_inline: model === 'inline' }"
    v-show="isShowDatetimePicker"
    :style="{
      height: `${
        model === 'inline'
          ? calendarContentHeight + (isShowArrowImg ? 30 : 0)
          : undefined
      }px`,
    }"
    @click="close"
  >
    <div
      class="calendar_content"
      :style="{
        height: `${calendarContentHeight}px`,
        bottom: `${isShowArrowImg ? 30 : 0}px`,
      }"
      @click.stop
    >
      <div class="calendar_title" v-if="isShowAction" ref="calendarTitleRef">
        <slot name="action">
          <div class="calendar_title_date">
            <span
              v-if="pickerType !== 'time'"
              class="calendar_title_date_year"
              :class="{ calendar_title_date_active: isShowCalendar }"
              @click="showCalendar"
              >{{
                formatDate(
                  `${checkedDate.year}/${checkedDate.month + 1}/${
                    checkedDate.day
                  }`,
                  language.DEFAULT_DATE_FORMAT
                )
              }}</span
            >
            <span
              v-if="pickerType !== 'date'"
              class="calendar_title_date_time"
              :class="{ calendar_title_date_active: !isShowCalendar }"
              @click="showTime"
              >{{
                formatDate(
                  `${checkedDate.year}/${checkedDate.month + 1}/${
                    checkedDate.day
                  } ${fillNumber(checkedDate.hours)}:${fillNumber(
                    checkedDate.minutes
                  )}`,
                  language.DEFAULT_TIME_FORMAT
                )
              }}</span
            >
          </div>
          <div
            v-if="showTodayButton"
            class="calendar_confirm"
            :class="{ today_disable: disabledDate(new Date()) }"
            @click="today"
          >
            <slot name="today">
              {{ language.TODAY }}
            </slot>
          </div>
          <div
            class="calendar_confirm"
            v-if="model === 'dialog'"
            @click="confirm"
          >
            <slot name="confirm">
              {{ language.CONFIRM }}
            </slot>
          </div>
        </slot>
      </div>
      <calendar
        ref="calendar"
        v-if="pickerType !== 'time'"
        :show="isShowCalendar"
        v-model="isShowWeek"
        v-bind="{ ...$props, ...$attrs }"
        :calendarTitleHeight="calendarTitleHeight"
        @height="heightChange"
        :default-date="currDateTime"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        @slidechange="slideChange"
        @change="dateChange"
        @click="dateClick"
      >
        <template v-if="hasSlot('week')" v-slot:week="scope">
          <slot name="week" :week="scope.week"> </slot>
        </template>
        <template v-if="hasSlot('day')" v-slot:day="scope">
          <slot name="day" :date="scope.date" :extendAttr="scope.extendAttr">
          </slot>
        </template>
      </calendar>

      <time-picker
        v-if="pickerType !== 'date'"
        :show="!isShowCalendar"
        :default-time="currDateTime"
        :calendarDate="checkedDate"
        v-bind="{ ...$props, ...$attrs }"
        @change="timeChange"
      ></time-picker>

      <year-month-picker
        v-if="changeYearFast"
        :calendarTitleHeight="calendarTitleHeight"
        :calendarContentHeight="calendarContentHeight"
        :calendarDate="checkedDate"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        @slidechange="slideChange"
        v-bind="{ ...$props, ...$attrs }"
        @click="dateClick"
        :type="yearMonthType"
      ></year-month-picker>
    </div>
    <div
      class="ctrl-img"
      v-if="isShowArrowImg"
      @click.stop="toggleWeek"
      :style="{ 'margin-top': `${calendarContentHeight}px` }"
    >
      <slot name="arrow" :show="isShowWeek">
        <img :src="isShowWeek ? arrowDownImg : arrowUpImg" />
      </slot>
    </div>
  </div>
</template>

<script setup>
import Calendar from "./Calendar.vue";
import TimePicker from "./TimePicker.vue";
import YearMonthPicker from "./YearMonthPicker.vue";
import { formatDate } from "../utils/util";
import { ARROW_DOWN_IMG, ARROW_UP_IMG } from "../constant/img";
import languageUtil from "../language";
import { DatetimePickerProps } from "./DatetimePicker";
import { computed, onMounted, reactive, watch } from "vue";

const defaultDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
  hours: new Date().getHours(),
  minutes: new Date().getMinutes(),
};

defineOptions({
  name: "VueHashCalendar",
});

const props = defineProps(DatetimePickerProps);

const calendarTitleRef = ref(null);
const arrowDownImg = ARROW_DOWN_IMG;
const arrowUpImg = ARROW_UP_IMG;
let language = reactive({});
const checkedDate = reactive(defaultDate);
const isShowWeek = ref(false);
const isShowCalendar = ref(false);
const calendarBodyHeight = ref(0);
const calendarTitleHeight = ref(0);
const firstTimes = ref(true);
const currDateTime = ref(new Date());
const yearMonthType = ref(date);

const isShowDatetimePicker = computed(() => {
  const visible = props.visible;
  return {
    get: () => {
      return visible;
    },
    set: (val) => {
      $emit("update:visible", val);
    },
  };
});

onMounted(() => {
  const model = props.model;
  const lang = props.lang;

  if (model === "inline") {
    isShowDatetimePicker.value = true;
  }

  language = languageUtil[lang.toUpperCase()];
});

watch(
  () => props.themeColor,
  (val) => {
    val && changeThemeColor();
  },
  { immediate: true }
);

watch(
  () => props.defaultDatetime,
  (val) => {
    if (!(val instanceof Date)) {
      throw new Error(
        "The calendar component's defaultDate must be date type!"
      );
    }

    currDateTime.value = val;
  },
  { immediate: true }
);

watch(
  () => props.pickerType,
  (val) => {
    if (val === "time") {
      showTime();
    }
  },
  { immediate: true }
);

watch(
  () => props.isShowAction,
  (flag) => {
    if (!flag) {
      calendarTitleHeight.value = 0;
    } else {
      setTimeout(() => {
        calendarTitleHeight.value = calendarTitleRef.value?.offsetHeight || 0;
      });
    }
  }
);

watch(
  checkedDate,
  () => {
    let date = new Date(
      `${checkedDate.year}/${checkedDate.month + 1}/${checkedDate.day} ${
        checkedDate.hours
      }:${checkedDate.minutes}`
    );
    if (format) {
      date = formatDate(date, format, lang);
    }
    $emit("change", date);
  },
  { deep: true }
);

watch(
  () => props.visible,
  (val) => {
    isShowCalendar.value = val;

    setTimeout(() => {
      calendarTitleHeight.value = calendarTitleRef.value?.offsetHeight || 0;
    });
  },
  { immediate: true }
);

export default {
  mounted() {},
  watch: {
    visible: {
      handler(val) {},
      immediate: true,
    },
    isShowWeekView: {
      handler(val) {
        isShowWeek = val;
      },
      immediate: true,
    },
  },
  computed: {
    isShowArrowImg() {
      return isShowArrow && model === "inline";
    },
    // 是否显示周视图 (为兼容旧版本，舍弃这种方式)
    // isShowWeek: {
    //   get() {
    //     return isShowWeekView
    //   },
    //   set(val) {
    //     $emit('update:isShowWeekView', val)
    //   }
    // },
    // 是否显示日期控件
    isShowDatetimePicker: {},
    // 日历组件的高度
    calendarContentHeight() {
      return calendarBodyHeight + calendarTitleHeight;
    },
  },
  methods: {
    // 判断是否有插槽
    hasSlot(slotName) {
      return !!$slots?.[slotName]?.();
    },
    // 周视图开关
    toggleWeek() {
      isShowWeek = !isShowWeek;

      if (isShowWeek) slideChange("up");
      else slideChange("down");
    },
    today() {
      if (disabledDate(new Date())) return;

      $refs.calendar.today();
    },
    lastMonth() {
      $refs.calendar.getLastMonth();
    },
    nextMonth() {
      $refs.calendar.getNextMonth();
    },
    lastWeek() {
      $refs.calendar.getLastMonth();
      $refs.calendar.changeWeekView({ isNext: false });
    },
    nextWeek() {
      $refs.calendar.getNextMonth();
      $refs.calendar.changeWeekView({ isNext: true });
    },
    dateChange(date) {
      date.hours = checkedDate.hours;
      date.minutes = checkedDate.minutes;
      checkedDate = date;
    },
    dateClick(date) {
      date.hours = checkedDate.hours;
      date.minutes = checkedDate.minutes;
      checkedDate = date;

      let fDate = new Date(
        `${checkedDate.year}/${checkedDate.month + 1}/${checkedDate.day} ${
          checkedDate.hours
        }:${checkedDate.minutes}`
      );
      if (format) {
        fDate = formatDate(fDate, format, lang);
      }

      // 控制点击之后进入下一选择面板
      if (date.type) {
        switch (date.type) {
          case "yearRange":
            yearMonthType = "year";
            break;
          case "year":
            yearMonthType = "month";
            break;
          case "month":
            currDateTime = new Date(fDate);
            yearMonthType = "date";
            break;
        }

        $emit("calendarTypeChange", yearMonthType);
      }

      $emit("click", fDate);
    },
    timeChange(date) {
      date.year = checkedDate.year;
      date.month = checkedDate.month;
      date.day = checkedDate.day;
      checkedDate = date;
    },
    // 确认选择时间
    confirm() {
      let date = new Date(
        `${checkedDate.year}/${checkedDate.month + 1}/${checkedDate.day} ${
          checkedDate.hours
        }:${checkedDate.minutes}`
      );
      if (format) {
        date = formatDate(date, format, lang);
      }
      $emit("confirm", date);
      if (model === "dialog") {
        close();
      }
    },
    show() {
      isShowDatetimePicker = true;
    },
    close() {
      isShowDatetimePicker = false;
    },
    // 小于10，在前面补0
    fillNumber(val) {
      return val > 9 ? val : "0" + val;
    },
    formatDate(time, format) {
      return formatDate(time, format, lang);
    },
    // 显示日历控件
    showCalendar() {
      if (isShowCalendar) {
        showYearMonthPicker();
      }
      isShowCalendar = true;
    },
    // 显示时间选择控件
    showTime() {
      isShowCalendar = false;

      // 重置年月选择面板
      yearMonthType = "date";
    },
    // 显示年月选择面板
    showYearMonthPicker() {
      if (!changeYearFast) return;

      if (yearMonthType === "date") {
        yearMonthType = "month";
      } else if (yearMonthType === "month") {
        yearMonthType = "year";
      } else if (yearMonthType === "year") {
        yearMonthType = "yearRange";
      } else {
        yearMonthType = "date";
      }

      $emit("calendarTypeChange", yearMonthType);
    },
    // 高度变化
    heightChange(height) {
      if (!firstTimes && model === "dialog") return;

      calendarBodyHeight = height;
      firstTimes = false;
    },
    // 切换主题颜色
    changeThemeColor() {
      const themeColorKeys = Object.keys(themeColor || {});

      if (themeColorKeys.length) {
        let cssText = "";

        themeColorKeys.forEach((k) => {
          cssText += `--hash-calendar-${k}: ${themeColor[k]};`;
        });

        $nextTick(() => {
          document.querySelector(".hash-calendar").style.cssText = cssText;
        });
      }
    },
    // 监听手指开始滑动事件
    touchStart(event) {
      $emit("touchstart", event);
    },
    // 监听手指开始滑动事件
    touchMove(event) {
      $emit("touchmove", event);
    },
    // 监听手指开始滑动事件
    touchEnd(event) {
      $emit("touchend", event);
    },
    // 滑动方向改变
    slideChange(direction) {
      $emit("slidechange", direction);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../style/common.styl';

.hash-calendar {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
}

.calendar_inline {
  position: relative;
  width: 100%;
  height: auto;
  background: none;
  height: px2vw(710px);
  z-index: 1;
}

.calendar_content {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  padding-bottom: px2vw(26px);
  flex-wrap: wrap;
  background: white;
  height: px2vw(710px);
  overflow: hidden;
}

.calendar_title {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  bgColor(background);
  borderBottom();
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
}

.calendar_title_date {
  viceFontColor(color);
  background: white;
  padding: px2vw(30px) px2vw(15px);
}

.calendar_title_date_active {
  mainFontColor(color);
  font-weight: bold;
}

.calendar_title_date_time {
  margin-left: px2vw(20px);
}

.calendar_confirm {
  mainColor(color);
  margin-right: px2vw(34px);
}

.today_disable {
  disabledFontColor(color);
}

.ctrl-img {
  width: 100%;
  text-align: center;

  img {
    width: 28px;
  }
}
</style>
