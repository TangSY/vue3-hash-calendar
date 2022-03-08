<template>
  <div
    class="calendar_body"
    :style="{ 'margin-top': calendarTitleHeight + 'px' }"
    v-show="show"
  >
    <div class="calendar_week" ref="weekTitleRef">
      <div class="calendar_item" v-for="item in calendarWeek" :key="item">
        <p class="calendar_day">
          <slot name="week" :week="item">
            {{ item }}
          </slot>
        </p>
      </div>
    </div>
    <div
      class="calendar_group"
      :style="{ height: `${calendarGroupHeight}px` }"
      ref="calendarRef"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <ul
        :style="{ transform: `translate3d(${-translateIndex * 100}%, 0, 0)` }"
      >
        <li
          class="calendar_group_li"
          v-for="(item, i) in calendarOfMonthShow"
          :key="i"
          :style="{
            transform: `translate3d(${
              (i - 1 + translateIndex + (isTouching ? touch.x : 0)) * 100
            }%, ${calendarY}px, 0)`,
            transitionDuration: `${isTouching ? 0 : transitionDuration}s`,
          }"
        >
          <div
            class="calendar_item"
            :ref="
              (el) => {
                calendarItemRef.length = 0;
                calendarItemRef.push(el);
              }
            "
            v-for="(date, j) in item"
            :class="
              formatDisabledDate(date) &&
              (disabledClassName || 'calendar_item_disable')
            "
            :key="i + j"
            @click="clickCalendarDay(date)"
          >
            <div
              class="calendar_day"
              :style="{ 'border-color': markDateColor(date, 'circle') }"
              :class="[
                isFirstDayOfMonth(date, i) &&
                  (firstDayOfMonthClassName || 'calendar_first_today'),
                isToday(date) && (todayClassName || 'calendar_day_today'),
                isCheckedDay(date) &&
                  (checkedDayClassName || 'calendar_day_checked'),
                isNotCurrentMonthDay(date, i) &&
                  (notCurrentMonthDayClassName || 'calendar_day_not'),
                markDateColor(date, 'circle') && 'calendar_mark_circle',
              ]"
            >
              <slot
                name="day"
                :date="date"
                :extendAttr="{
                  isMarked: !!(
                    markDateColor(date, 'circle') || markDateColor(date, 'dot')
                  ),
                  isDisabledDate: formatDisabledDate(date),
                  isToday: isToday(date),
                  isChecked: isCheckedDay(date),
                  isCurrentMonthDay: !isNotCurrentMonthDay(date, i),
                  isFirstDayOfMonth: isFirstDayOfMonth(date, i),
                }"
              >
                {{
                  isFirstDayOfMonth(date, i)
                    ? language.MONTH && language.MONTH[date.month]
                    : date.day
                }}
              </slot>
            </div>
            <div
              :style="{ background: markDateColor(date, 'dot') }"
              class="calendar_dot"
            ></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatDate, isDateInRange } from "../utils/util";
import languageUtil from "../language";
import { reactive, ref, watch, nextTick, computed, onMounted } from "vue";
import { CalendarProps } from "./Calendar";

defineOptions({
  name: "Calendar",
});

const props = defineProps(CalendarProps);

const emit = defineEmits([
  "height",
  "update:isShowWeekView",
  "click",
  "change",
  "slidechange",
  "touchstart",
  "touchmove",
  "touchend",
]);

let timer = null;
const weekTitleRef = ref(null);
const calendarRef = ref(null);
const calendarItemRef = reactive([]);
const language = ref({});
const currentChangeIsScroll = ref(false);
const yearOfCurrentShow = ref(new Date().getFullYear());
const monthOfCurrentShow = ref(new Date().getMonth());
const yearOfToday = ref(new Date().getFullYear());
const monthOfToday = ref(new Date().getMonth());
const dayOfToday = ref(new Date().getDate());
const weekArray = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const calendarWeek = ref(["日", "一", "二", "三", "四", "五", "六"]);
const calendarOfMonth = ref([]);
const calendarOfMonthShow = ref([]);
const calendarDaysTotalLength = ref(42);
const lastMonthYear = ref(null);
const lastMonth = ref(null);
const nextMonthYear = ref(null);
const nextMonth = ref(null);
const checkedDate = ref({});
const weekStartIndex = ref(0);
const translateIndex = ref(0);
const transitionDuration = ref(0.3);
const touch = ref({
  x: 0,
  y: 0,
});
const isTouching = ref(false);
const calendarGroupHeight = ref(0);
const calendarWeekTitleHeight = ref(0);
const calendarItemHeight = ref(0);
const touchStartPositionX = ref(null);
const touchStartPositionY = ref(null);
const calendarY = ref(0);
const selectedDayIndex = ref(0);
const lastWeek = ref([]);
const nextWeek = ref([]);
const isLastWeekInCurrentMonth = ref(false);
const isNextWeekInCurrentMonth = ref(false);
const markDateColorObj = ref({});
const markDateTypeObj = ref({});

language.value = languageUtil[props.lang.toUpperCase()];
calendarWeek.value = language.value.WEEK;
weekStartIndex.value = weekArray.indexOf(props.weekStart.toLowerCase());
calendarWeek.value = [
  ...calendarWeek.value.slice(weekStartIndex.value, calendarWeek.value.length),
  ...calendarWeek.value.slice(0, weekStartIndex.value),
];

const isShowWeek = computed({
  get() {
    return props.isShowWeekView;
  },
  set(val) {
    emit("update:isShowWeekView", val);
  },
});

// 初始化日历dom
const initDom = () => {
  nextTick(() => {
    calendarItemHeight.value = calendarItemRef[0]?.offsetHeight;
    calendarWeekTitleHeight.value = weekTitleRef.value?.offsetHeight;

    let calendarItemGroup = calendarItemRef || [];
    calendarItemGroup.forEach((item) => {
      item.style.height = `${calendarItemHeight}px`;
    });

    showMonth();
    calendarGroupHeight.value = calendarItemHeight.value * 6;
  });
};

// 今天
const today = () => {
  checkedDate.value.day = new Date().getDate();

  yearOfCurrentShow.value = new Date().getFullYear(); // 当前日历展示的年份
  monthOfCurrentShow.value = new Date().getMonth(); // 当前日历展示的月份

  calculateCalendarOfThreeMonth();

  if (isShowWeek.value) {
    setTimeout(() => {
      isTouching.value = true;
      checkedDate.value.year = new Date().getFullYear();
      checkedDate.value.month = new Date().getMonth();
      showWeek();
    }, transitionDuration.value * 1000);
  }
};

// 是否为当前月的第一天
const isFirstDayOfMonth = (date, i) => {
  return date.day === 1 && !isNotCurrentMonthDay(date, i);
};

// 计算当前展示月份的前后月份日历信息 flag  -1:获取上个月日历信息   0:当月信息或者跨月展示日历信息  1:获取下个月日历信息
const calculateCalendarOfThreeMonth = (
  year = new Date().getFullYear(),
  month = new Date().getMonth()
) => {
  lastMonthYear.value = month === 0 ? year - 1 : year; // 上个月的年份
  lastMonth.value = month === 0 ? 11 : month - 1; // 上个月的月份
  nextMonthYear.value = month === 11 ? year + 1 : year; // 下个月的年份
  nextMonth.value = month === 11 ? 0 : month + 1; // 下个月的月份

  let firstMonth = calculateCalendarOfMonth(
    lastMonthYear.value,
    lastMonth.value
  );
  let secondMonth = calculateCalendarOfMonth(year, month);
  let thirdMonth = calculateCalendarOfMonth(
    nextMonthYear.value,
    nextMonth.value
  );

  calendarOfMonth.value = [];
  calendarOfMonth.value.push(firstMonth, secondMonth, thirdMonth);
  calendarOfMonthShow.value = JSON.parse(JSON.stringify(calendarOfMonth.value));

  if (!props.scrollChangeDate && currentChangeIsScroll.value) {
    currentChangeIsScroll.value = false;
    return;
  }

  // 改变日期选择的日期
  let tempDate = {};
  let day = checkedDate.value.day;
  if (day > 30 || (day > 28 && month === 1)) {
    day = daysOfMonth(year)[month];
  }
  tempDate = { day: day, year: year, month: month };

  if (formatDisabledDate(tempDate)) return;

  // fix: change 事件会触发两次 https://github.com/TangSY/vue-hash-calendar/issues/47
  if (isShowWeek.value) return;

  checkedDate.value.day = tempDate.day;
  checkedDate.value.year = year;
  checkedDate.value.month = month;
};

// 计算每个月的日历
const calculateCalendarOfMonth = (
  year = new Date().getFullYear(),
  month = new Date().getMonth()
) => {
  let calendarOfCurrentMonth = [];

  let lastMonthYear = month === 0 ? year - 1 : year; // 上个月的年份
  let lastMonth = month === 0 ? 11 : month - 1; // 上个月的月份
  let nextMonthYear = month === 11 ? year + 1 : year; // 下个月的年份
  let nextMonth = month === 11 ? 0 : month + 1; // 下个月的月份

  // 如果当月第一天不是指定的开始星期名称，则在前面补齐上个月的日期
  let dayOfWeek = getDayOfWeek(year, month);
  let lastMonthDays = daysOfMonth(year)[lastMonth]; // 上个月的总天数
  if (dayOfWeek < weekStartIndex.value) {
    dayOfWeek = 7 - weekStartIndex.value + dayOfWeek;
  } else {
    dayOfWeek -= weekStartIndex.value;
  }
  for (let i = 0; i < dayOfWeek; i++) {
    calendarOfCurrentMonth.push({
      year: lastMonthYear,
      month: lastMonth,
      day: props.isShowNotCurrentMonthDay
        ? lastMonthDays - (dayOfWeek - 1 - i)
        : "",
    });
  }

  // 当月日期
  for (let i = 0; i < daysOfMonth(year)[month]; i++) {
    calendarOfCurrentMonth.push({
      year: year,
      month: month,
      day: i + 1,
    });
  }

  // 在日历后面填充下个月的日期，补齐6行7列
  let fillDays = calendarDaysTotalLength.value - calendarOfCurrentMonth.length;
  for (let i = 0; i < fillDays; i++) {
    calendarOfCurrentMonth.push({
      year: nextMonthYear,
      month: nextMonth,
      day: props.isShowNotCurrentMonthDay ? i + 1 : "",
    });
  }

  return calendarOfCurrentMonth;
};

const daysOfMonth = (year) => {
  return [31, 28 + isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};

// 判断是否为闰年
const isLeap = (year) => {
  return year % 4 === 0 ? (year % 100 !== 0 ? 1 : year % 400 === 0 ? 1 : 0) : 0;
};

// 获取月份某一天是星期几
const getDayOfWeek = (
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
  day = 1
) => {
  let dayOfMonth = new Date(year, month, day); // 获取当月的第day天
  let dayOfWeek = dayOfMonth.getDay(); // 判断第day天是星期几(返回[0-6]中的一个，0代表星期天，1代表星期一)
  return dayOfWeek;
};

// 点击日历上的日期
const clickCalendarDay = (date) => {
  if (!date || !date.day) return;

  if (formatDisabledDate(date)) return;

  checkedDate.value.year = date.year;
  checkedDate.value.month = date.month;
  checkedDate.value.day = date.day;

  if (date.month === lastMonth.value && date.year === lastMonthYear.value) {
    getLastMonth();
  }
  if (date.month === nextMonth.value && date.year === nextMonthYear.value) {
    getNextMonth();
  }

  if (isShowWeek.value) {
    showWeek();
  }

  emit("click", checkedDate.value);
};

// 该日期是否为今天
const isToday = (date) => {
  return (
    yearOfToday.value === date.year &&
    monthOfToday.value === date.month &&
    dayOfToday.value === date.day
  );
};

// 该日期是否为选中的日期
const isCheckedDay = (date) => {
  if (formatDisabledDate(date)) return false;

  return (
    checkedDate.value.year === date.year &&
    checkedDate.value.month === date.month &&
    checkedDate.value.day === date.day
  );
};

// 非本月日期
const isNotCurrentMonthDay = (date, index) => {
  let dateOfCurrentShow = calendarOfMonth.value[index][15]; // 本月中间的日期一定为本月
  return (
    date.year !== dateOfCurrentShow.year ||
    date.month !== dateOfCurrentShow.month
  );
};

// 监听手指开始滑动事件
const touchStart = (event) => {
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
const touchMove = (event) => {
  emit("touchmove", event);

  // fix: 禁止切换周模式显示后，日历区域上下滑动，页面不能触发上下滑动了 #62
  if (!props.disabledWeekView) {
    event.stopPropagation();
    event.preventDefault();
  }

  let moveX = event.touches[0].clientX - touchStartPositionX.value;
  let moveY = event.touches[0].clientY - touchStartPositionY.value;
  if (Math.abs(moveX) > Math.abs(moveY)) {
    if (isDisabledHorizontalScroll(moveX < 0 ? "left" : "right")) return;

    touch.value = {
      x: moveX / calendarRef.value?.offsetWidth,
      y: 0,
    };
  } else {
    // 禁用周视图（禁止上下滑动）
    if (props.disabledWeekView) return;

    touch.value = {
      x: 0,
      y: moveY / calendarRef.value?.offsetHeight,
    };
  }

  setDisabledScrollDirection();
};

// 监听touch结束事件
const touchEnd = (e) => {
  emit("touchend", e);

  isTouching.value = false;
  if (
    Math.abs(touch.value.x) > Math.abs(touch.value.y) &&
    Math.abs(touch.value.x) > 0.2
  ) {
    currentChangeIsScroll.value = true;
    if (touch.value.x > 0) {
      emit("slidechange", "right");

      getLastMonth();
      if (isShowWeek.value) {
        changeWeekView({ isNext: false });
      }
    } else if (touch.value.x < 0) {
      emit("slidechange", "left");

      getNextMonth();
      if (isShowWeek.value) {
        changeWeekView({ isNext: true });
      }
    }
  }
  if (
    Math.abs(touch.value.y) > Math.abs(touch.value.x) &&
    Math.abs(touch.value.y * calendarRef.value?.offsetHeight) > 50
  ) {
    if (touch.value.y > 0 && isShowWeek.value) {
      emit("slidechange", "down");

      showMonth();
    } else if (touch.value.y < 0 && !isShowWeek.value) {
      emit("slidechange", "up");

      showWeek();
    }
  } else {
    touch.value = {
      x: 0,
      y: 0,
    };
  }
};

// 日历以月份方式展示
const showMonth = () => {
  calendarY.value = 0;
  isShowWeek.value = false;
  calendarGroupHeight.value = calendarItemHeight.value * 6;

  isLastWeekInCurrentMonth.value = false;
  isNextWeekInCurrentMonth.value = false;

  calculateCalendarOfThreeMonth(
    checkedDate.value.year,
    checkedDate.value.month
  );
};

// 日历以星期方式展示
const showWeek = (checkedDatetime = checkedDate.value) => {
  let daysArr = [];
  calendarOfMonth.value[1].forEach((item) => {
    daysArr.push(item.day);
  });
  let dayIndexOfMonth = daysArr.indexOf(checkedDatetime.day);
  // 当day为月底的天数时，有可能在daysArr的前面也存在上一个月对应的日期，所以需要取lastIndexOf
  if (checkedDatetime.day > 15) {
    dayIndexOfMonth = daysArr.lastIndexOf(checkedDatetime.day);
  }

  // 计算当前日期在第几行
  let indexOfLine = Math.ceil((dayIndexOfMonth + 1) / 7);
  let lastLine = indexOfLine - 1;
  calendarY.value = -(calendarItemHeight.value * lastLine);

  isShowWeek.value = true;
  calendarGroupHeight.value = calendarItemHeight.value;

  let currentWeek = [];
  let sliceStart = lastLine * 7;
  let sliceEnd = sliceStart + 7;
  isLastWeekInCurrentMonth.value = false;
  currentWeek = calendarOfMonth.value[1].slice(sliceStart, sliceEnd);
  for (let i in currentWeek) {
    if (currentWeek[i].day === checkedDatetime.day) {
      selectedDayIndex.value = parseInt(i);
    }
  }

  let firstDayOfCurrentWeek = currentWeek[0];
  let lastDayOfCurrentWeek = currentWeek[6];

  if (
    firstDayOfCurrentWeek.month !== checkedDatetime.month ||
    firstDayOfCurrentWeek.day === 1
  ) {
    if (
      calendarOfMonth.value[0].slice(28, 35)[6].month !== checkedDatetime.month
    ) {
      lastWeek.value = calendarOfMonth.value[0].slice(28, 35);
    } else {
      lastWeek.value = calendarOfMonth.value[0].slice(21, 28);
    }
  } else {
    lastWeek.value = calendarOfMonth.value[1].slice(
      sliceStart - 7,
      sliceEnd - 7
    );
    if (
      lastWeek.value[selectedDayIndex.value] &&
      lastWeek.value[selectedDayIndex.value].month === checkedDatetime.month
    ) {
      isLastWeekInCurrentMonth.value = true;
    }
  }

  isNextWeekInCurrentMonth.value = false;
  if (
    lastDayOfCurrentWeek.day < firstDayOfCurrentWeek.day &&
    lastDayOfCurrentWeek.month !== checkedDatetime.month
  ) {
    nextWeek.value = calendarOfMonth.value[2].slice(7, 14);
  } else {
    if (
      lastDayOfCurrentWeek.day ===
      daysOfMonth(lastDayOfCurrentWeek.year)[lastDayOfCurrentWeek.month]
    ) {
      nextWeek.value = calendarOfMonth.value[2].slice(0, 7);
    } else {
      nextWeek.value = calendarOfMonth.value[1].slice(
        sliceStart + 7,
        sliceEnd + 7
      );
      if (
        nextWeek.value[selectedDayIndex.value].month === checkedDatetime.month
      ) {
        isNextWeekInCurrentMonth.value = true;
      }
    }
  }
  calendarOfMonthShow.value[0].splice(sliceStart, 7, ...lastWeek.value);
  calendarOfMonthShow.value[2].splice(sliceStart, 7, ...nextWeek.value);
};

// 切换展示的星期
const changeWeekView = ({ isNext }) => {
  if (timer) timer = null;

  timer = setTimeout(() => {
    isTouching.value = true;
    currentChangeIsScroll.value = true;
    isNext ? getNextWeek() : getLastWeek();
  }, transitionDuration.value * 1000);
};

// 显示上一周
const getLastWeek = () => {
  let checked = lastWeek.value[selectedDayIndex.value];
  showWeek(checked);

  if (formatDisabledDate(checked)) return;

  if (!props.scrollChangeDate && currentChangeIsScroll.value) {
    currentChangeIsScroll.value = false;
    return;
  }

  checkedDate.value = checked;
};

// 显示下一周
const getNextWeek = () => {
  let checked = nextWeek.value[selectedDayIndex.value];
  showWeek(checked);

  if (formatDisabledDate(checked)) return;

  if (!props.scrollChangeDate && currentChangeIsScroll.value) {
    currentChangeIsScroll.value = false;
    return;
  }

  checkedDate.value = checked;
};

// 获取上个月日历
const getLastMonth = () => {
  translateIndex.value += 1;

  if (!isLastWeekInCurrentMonth.value) {
    yearOfCurrentShow.value = lastMonthYear.value;
    monthOfCurrentShow.value = lastMonth.value;
  }
  calculateCalendarOfThreeMonth(
    yearOfCurrentShow.value,
    monthOfCurrentShow.value
  );
};

// 获取下个月日历
const getNextMonth = () => {
  translateIndex.value -= 1;

  if (!isNextWeekInCurrentMonth.value) {
    yearOfCurrentShow.value = nextMonthYear.value;
    monthOfCurrentShow.value = nextMonth.value;
  }
  calculateCalendarOfThreeMonth(
    yearOfCurrentShow.value,
    monthOfCurrentShow.value
  );
};

// 当前日期是否需要标记
const markDateColor = (date, type) => {
  let dateString = `${date.year}/${fillNumber(date.month + 1)}/${fillNumber(
    date.day
  )}`;
  let markDateTypeString = markDateTypeObj.value[dateString] || "";

  if (markDateTypeString.indexOf(type) === -1) return;

  return markDateColorObj.value[dateString];
};

const formatDisabledDate = (date) => {
  if (!date.day) return;

  let fDate = new Date(`${date.year}/${date.month + 1}/${date.day}`);

  return (
    props.disabledDate(fDate) ||
    !isDateInRange(fDate, props.minDate, props.maxDate)
  );
};

// 禁止继续往横向的当前方向滑动 （当设置 minDate 或 maxDate 时生效）
const isDisabledHorizontalScroll = (direc) => {
  let minDate = props.minDate && props.minDate.getTime() - 24 * 60 * 60 * 1000;
  let maxDate = props.maxDate && props.maxDate.getTime();

  if (isShowWeek.value) {
    let lastWeekLastedDay = new Date(
      `${lastWeek.value[6].year}/${lastWeek.value[6].month + 1}/${
        lastWeek.value[6].day
      }`
    ).getTime();
    let nextWeekFirstDay = new Date(
      `${nextWeek.value[0].year}/${nextWeek.value[0].month + 1}/${
        nextWeek.value[0].day
      }`
    ).getTime();
    if (direc === "left" && maxDate) return nextWeekFirstDay >= maxDate;
    if (direc === "right" && minDate) return lastWeekLastedDay <= minDate;
  } else {
    let lastMonthLastedDay = new Date(
      `${lastMonthYear.value}/${lastMonth.value + 1}/${
        daysOfMonth(lastMonthYear.value)[lastMonth.value]
      }`
    ).getTime();
    let nextMonthFirstDay = new Date(
      `${nextMonthYear.value}/${nextMonth.value + 1}/1`
    ).getTime();
    if (direc === "left" && maxDate) return nextMonthFirstDay >= maxDate;
    if (direc === "right" && minDate) return lastMonthLastedDay <= minDate;
  }

  return false;
};

// 小于10，在前面补0
const fillNumber = (val) => {
  return val > 9 ? val : "0" + val;
};

// 日期格式转换
const dateFormat = (dateArr) => {
  dateArr.forEach((date, index) => {
    dateArr[index] = formatDate(date, "YY/MM/DD");
  });

  return dateArr;
};

// 是否可以滑动
const isCanScroll = (dire) => {
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

onMounted(() => {
  initDom();
});

watch(
  () => props.markDate,
  (val) => {
    val.forEach((item, index) => {
      if (!item.color) {
        let obj = {};
        obj.color = "#1c71fb";
        if (typeof item === "string" || typeof item === "number") {
          item = [item];
        }
        obj.date = item || [];
        val[index] = obj;
      }
      val[index].type = item.type || props.markType || "";

      val[index].date = dateFormat(val[index].date);
    });

    markDateColorObj.value = {};
    markDateTypeObj.value = {};
    val.forEach((item) => {
      item.date.forEach((date) => {
        markDateColorObj.value[date] = item.color;
        markDateTypeObj.value[date] = item.type;
      });
    });
  },
  { deep: true, immediate: true }
);

watch(weekStartIndex, () => {
  calculateCalendarOfThreeMonth(
    checkedDate.value.year,
    checkedDate.value.month
  );
});

watch(
  () => props.defaultDate,
  (val) => {
    if (!(val instanceof Date)) {
      throw new Error(
        "The calendar component's defaultDate must be date type!"
      );
    }

    checkedDate.value.year = val.getFullYear();
    checkedDate.value.month = val.getMonth();
    checkedDate.value.day = val.getDate();
    calculateCalendarOfThreeMonth(val.getFullYear(), val.getMonth());

    if (isShowWeek.value) {
      showWeek();
    }
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
      calculateCalendarOfThreeMonth(
        checkedDate.value.year,
        checkedDate.value.month
      );
      initDom();
    }
  },
  { immediate: true }
);

watch(
  isShowWeek,
  (val) => {
    if (val) {
      nextTick(() => {
        showWeek();
      });
    } else {
      nextTick(() => {
        showMonth();
      });
    }
  },
  { immediate: true }
);

watch(calendarGroupHeight, (val) => {
  emit("height", val + calendarWeekTitleHeight.value);
});

watch(
  () => props.isShowWeekView,
  (val) => {
    if (val && props.disabledWeekView) {
      throw new Error(
        "'isShowWeekView' and 'disabledWeekView' can't be used at the same time"
      );
    }
  },
  { immediate: true }
);

watch(
  () => props.disabledWeekView,
  (val) => {
    if (val && props.isShowWeekView) {
      throw new Error(
        "'isShowWeekView' and 'disabledWeekView' can't be used at the same time"
      );
    }
  },
  { immediate: true }
);

defineExpose({
  today,
  getLastMonth,
  getNextMonth,
  changeWeekView,
});
</script>

<style lang="stylus" scoped>
@import '../style/common.styl';

.calendar_body {
  position: relative;
  width: 100%;
  margin-top: px2vw(100px);
}

.calendar_week {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  flexAlign();
  background: white;
  viceFontColor(color);
  z-index: 2;
}

.calendar_group {
  position: absolute;
  top: px2vw(70px);
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  transition: height 0.3s;
  -webkit-transition: height 0.3s;
}

.calendar_group ul {
  height: 100%;
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

.calendar_item {
  width: 14.13333335%;
  flexContent();
  flex-direction: column;
}

.calendar_item_disable {
  disabledBgColor(background-color);
  opacity: 1;
  cursor: not-allowed;
  disabledFontColor(color);
}

.calendar_day {
  width: px2vw(60px);
  height: px2vw(60px);
  border-radius: 50%;
  fontSize(28px);
  flexContent();
  margin-bottom: px2vw(8px);
}

.calendar_first_today {
  mainColor(color);
}

.calendar_first_today span {
  fontSize(20px);
  margin-top: px2vw(3px);
}

.calendar_day_today {
  bgColor(background);
}

.calendar_mark_circle {
  mainColor(border);
}

.calendar_day_not {
  disabledFontColor(color);
}

.calendar_day_checked {
  mainColor(background);
  color: white;
}

.calendar_dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}
</style>
