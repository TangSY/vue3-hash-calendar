var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { defineComponent, ref, reactive, computed, onMounted, watch, nextTick, withDirectives, openBlock, createElementBlock, normalizeStyle, createElementVNode, Fragment, renderList, renderSlot, createTextVNode, toDisplayString, normalizeClass, unref, vShow, withModifiers, createVNode, withCtx, useSlots, createCommentVNode, createBlock, mergeProps, isRef, createSlots } from "vue";
var reset = "";
var CN = {
  CONFIRM: "\u786E\u5B9A",
  TODAY: "\u4ECA\u5929",
  WEEK: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
  MONTH: [
    "1\u6708",
    "2\u6708",
    "3\u6708",
    "4\u6708",
    "5\u6708",
    "6\u6708",
    "7\u6708",
    "8\u6708",
    "9\u6708",
    "10\u6708",
    "11\u6708",
    "12\u6708"
  ],
  DEFAULT_DATE_FORMAT: "YY\u5E74MM\u6708DD\u65E5",
  DEFAULT_TIME_FORMAT: "hh:mm"
};
var EN = {
  CONFIRM: "CONFIRM",
  TODAY: "TODAY",
  WEEK: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
  MONTH: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ],
  DEFAULT_DATE_FORMAT: "MM DD,YY",
  DEFAULT_TIME_FORMAT: "at hh:mm F"
};
var languageUtil = {
  CN,
  EN
};
var __glob_0_0 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": languageUtil
});
const checkPlatform = function() {
  if (/android/i.test(navigator.userAgent)) {
    return "1";
  }
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return "2";
  }
};
let formatDate = function(time, format, lang = "CN") {
  lang = lang.toUpperCase();
  const models = { "../language/index.js": __glob_0_0 };
  const model = models[Object.keys(models)[0]];
  let language = model.default[lang] || {};
  format = format || `${language.DEFAULT_DATE_FORMAT} ${language.DEFAULT_TIME_FORMAT}`;
  let date = time ? new Date(time) : new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let preArr = Array.apply(null, Array(10)).map(function(elem, index2) {
    return "0" + index2;
  });
  let newTime = format.replace(/YY/g, year).replace(/F/g, hour >= 12 ? "pm" : "am").replace(/ss/g, preArr[sec] || sec).replace(/mm/g, preArr[min] || min).replace(/hh/g, hour > 12 && format.includes("F") ? hour - 12 : format.includes("F") ? hour : preArr[hour] || hour).replace(/DD/g, preArr[day] || day).replace(/MM/g, lang === "EN" ? language.MONTH[month - 1] : preArr[month] || month);
  return newTime;
};
const isDateInRange = (curr, min, max) => {
  let minDate = min && min.getTime() - 24 * 60 * 60 * 1e3;
  let maxDate = max && max.getTime();
  let currentDate = curr && curr.getTime();
  if (minDate && maxDate)
    return currentDate > minDate && currentDate < maxDate;
  if (minDate)
    return currentDate > minDate;
  if (maxDate)
    return currentDate < maxDate;
  return true;
};
const CalendarProps = {
  minDate: {
    type: Date,
    default: null
  },
  maxDate: {
    type: Date,
    default: null
  },
  firstDayOfMonthClassName: {
    type: String,
    default: ""
  },
  calendarTitleHeight: {
    type: Number,
    default: 0
  },
  todayClassName: {
    type: String,
    default: ""
  },
  checkedDayClassName: {
    type: String,
    default: ""
  },
  notCurrentMonthDayClassName: {
    type: String,
    default: ""
  },
  disabledClassName: {
    type: String,
    default: ""
  },
  scrollChangeDate: {
    type: Boolean,
    default: true
  },
  disabledWeekView: {
    type: Boolean,
    default: false
  },
  defaultDate: {
    type: Date,
    default() {
      return new Date();
    }
  },
  show: {
    type: Boolean,
    default: false
  },
  weekStart: {
    type: String,
    default: "Sunday"
  },
  isShowNotCurrentMonthDay: {
    type: Boolean,
    default: true
  },
  isShowWeekView: {
    type: Boolean,
    default: false
  },
  markDate: {
    type: Array,
    default: () => []
  },
  markType: {
    type: String,
    default: "dot"
  },
  disabledDate: {
    type: Function,
    default: () => {
      return false;
    }
  },
  disabledScroll: {
    type: [Boolean, String],
    default: false
  },
  lang: {
    type: String,
    default: "CN"
  }
};
var Calendar_vue_vue_type_style_index_0_scoped_true_lang = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _hoisted_1$4 = { class: "calendar_day" };
const _hoisted_2$2 = ["onClick"];
const __default__$4 = {
  name: "Calendar"
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$4), {
  props: CalendarProps,
  emits: [
    "height",
    "update:isShowWeekView",
    "click",
    "change",
    "slidechange",
    "touchstart",
    "touchmove",
    "touchend"
  ],
  setup(__props, { expose, emit }) {
    const props = __props;
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
      "saturday"
    ];
    const calendarWeek = ref(["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"]);
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
      y: 0
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
      ...calendarWeek.value.slice(0, weekStartIndex.value)
    ];
    const isShowWeek = computed({
      get() {
        return props.isShowWeekView;
      },
      set(val) {
        emit("update:isShowWeekView", val);
      }
    });
    const initDom = () => {
      nextTick(() => {
        var _a, _b;
        calendarItemHeight.value = (_a = calendarItemRef[0]) == null ? void 0 : _a.offsetHeight;
        calendarWeekTitleHeight.value = (_b = weekTitleRef.value) == null ? void 0 : _b.offsetHeight;
        let calendarItemGroup = calendarItemRef || [];
        calendarItemGroup.forEach((item) => {
          item.style.height = `${calendarItemHeight}px`;
        });
        showMonth();
        calendarGroupHeight.value = calendarItemHeight.value * 6;
      });
    };
    const today = () => {
      checkedDate.value.day = new Date().getDate();
      yearOfCurrentShow.value = new Date().getFullYear();
      monthOfCurrentShow.value = new Date().getMonth();
      calculateCalendarOfThreeMonth();
      if (isShowWeek.value) {
        setTimeout(() => {
          isTouching.value = true;
          checkedDate.value.year = new Date().getFullYear();
          checkedDate.value.month = new Date().getMonth();
          showWeek();
        }, transitionDuration.value * 1e3);
      }
    };
    const isFirstDayOfMonth = (date, i) => {
      return date.day === 1 && !isNotCurrentMonthDay(date, i);
    };
    const calculateCalendarOfThreeMonth = (year = new Date().getFullYear(), month = new Date().getMonth()) => {
      lastMonthYear.value = month === 0 ? year - 1 : year;
      lastMonth.value = month === 0 ? 11 : month - 1;
      nextMonthYear.value = month === 11 ? year + 1 : year;
      nextMonth.value = month === 11 ? 0 : month + 1;
      let firstMonth = calculateCalendarOfMonth(lastMonthYear.value, lastMonth.value);
      let secondMonth = calculateCalendarOfMonth(year, month);
      let thirdMonth = calculateCalendarOfMonth(nextMonthYear.value, nextMonth.value);
      calendarOfMonth.value = [];
      calendarOfMonth.value.push(firstMonth, secondMonth, thirdMonth);
      calendarOfMonthShow.value = JSON.parse(JSON.stringify(calendarOfMonth.value));
      if (!props.scrollChangeDate && currentChangeIsScroll.value) {
        currentChangeIsScroll.value = false;
        return;
      }
      let tempDate = {};
      let day = checkedDate.value.day;
      if (day > 30 || day > 28 && month === 1) {
        day = daysOfMonth(year)[month];
      }
      tempDate = { day, year, month };
      if (formatDisabledDate(tempDate))
        return;
      if (isShowWeek.value)
        return;
      checkedDate.value.day = tempDate.day;
      checkedDate.value.year = year;
      checkedDate.value.month = month;
    };
    const calculateCalendarOfMonth = (year = new Date().getFullYear(), month = new Date().getMonth()) => {
      let calendarOfCurrentMonth = [];
      let lastMonthYear2 = month === 0 ? year - 1 : year;
      let lastMonth2 = month === 0 ? 11 : month - 1;
      let nextMonthYear2 = month === 11 ? year + 1 : year;
      let nextMonth2 = month === 11 ? 0 : month + 1;
      let dayOfWeek = getDayOfWeek(year, month);
      let lastMonthDays = daysOfMonth(year)[lastMonth2];
      if (dayOfWeek < weekStartIndex.value) {
        dayOfWeek = 7 - weekStartIndex.value + dayOfWeek;
      } else {
        dayOfWeek -= weekStartIndex.value;
      }
      for (let i = 0; i < dayOfWeek; i++) {
        calendarOfCurrentMonth.push({
          year: lastMonthYear2,
          month: lastMonth2,
          day: props.isShowNotCurrentMonthDay ? lastMonthDays - (dayOfWeek - 1 - i) : ""
        });
      }
      for (let i = 0; i < daysOfMonth(year)[month]; i++) {
        calendarOfCurrentMonth.push({
          year,
          month,
          day: i + 1
        });
      }
      let fillDays = calendarDaysTotalLength.value - calendarOfCurrentMonth.length;
      for (let i = 0; i < fillDays; i++) {
        calendarOfCurrentMonth.push({
          year: nextMonthYear2,
          month: nextMonth2,
          day: props.isShowNotCurrentMonthDay ? i + 1 : ""
        });
      }
      return calendarOfCurrentMonth;
    };
    const daysOfMonth = (year) => {
      return [31, 28 + isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    };
    const isLeap = (year) => {
      return year % 4 === 0 ? year % 100 !== 0 ? 1 : year % 400 === 0 ? 1 : 0 : 0;
    };
    const getDayOfWeek = (year = new Date().getFullYear(), month = new Date().getMonth(), day = 1) => {
      let dayOfMonth = new Date(year, month, day);
      let dayOfWeek = dayOfMonth.getDay();
      return dayOfWeek;
    };
    const clickCalendarDay = (date) => {
      if (!date || !date.day)
        return;
      if (formatDisabledDate(date))
        return;
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
    const isToday = (date) => {
      return yearOfToday.value === date.year && monthOfToday.value === date.month && dayOfToday.value === date.day;
    };
    const isCheckedDay = (date) => {
      if (formatDisabledDate(date))
        return false;
      return checkedDate.value.year === date.year && checkedDate.value.month === date.month && checkedDate.value.day === date.day;
    };
    const isNotCurrentMonthDay = (date, index2) => {
      let dateOfCurrentShow = calendarOfMonth.value[index2][15];
      return date.year !== dateOfCurrentShow.year || date.month !== dateOfCurrentShow.month;
    };
    const touchStart = (event) => {
      emit("touchstart", event);
      touchStartPositionX.value = event.touches[0].clientX;
      touchStartPositionY.value = event.touches[0].clientY;
      touch.value = {
        x: 0,
        y: 0
      };
      isTouching.value = true;
    };
    const touchMove = (event) => {
      var _a, _b;
      emit("touchmove", event);
      if (!props.disabledWeekView) {
        event.stopPropagation();
        event.preventDefault();
      }
      let moveX = event.touches[0].clientX - touchStartPositionX.value;
      let moveY = event.touches[0].clientY - touchStartPositionY.value;
      if (Math.abs(moveX) > Math.abs(moveY)) {
        if (isDisabledHorizontalScroll(moveX < 0 ? "left" : "right"))
          return;
        touch.value = {
          x: moveX / ((_a = calendarRef.value) == null ? void 0 : _a.offsetWidth),
          y: 0
        };
      } else {
        if (props.disabledWeekView)
          return;
        touch.value = {
          x: 0,
          y: moveY / ((_b = calendarRef.value) == null ? void 0 : _b.offsetHeight)
        };
      }
      setDisabledScrollDirection();
    };
    const touchEnd = (e) => {
      var _a;
      emit("touchend", e);
      isTouching.value = false;
      if (Math.abs(touch.value.x) > Math.abs(touch.value.y) && Math.abs(touch.value.x) > 0.2) {
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
      if (Math.abs(touch.value.y) > Math.abs(touch.value.x) && Math.abs(touch.value.y * ((_a = calendarRef.value) == null ? void 0 : _a.offsetHeight)) > 50) {
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
          y: 0
        };
      }
    };
    const showMonth = () => {
      calendarY.value = 0;
      isShowWeek.value = false;
      calendarGroupHeight.value = calendarItemHeight.value * 6;
      isLastWeekInCurrentMonth.value = false;
      isNextWeekInCurrentMonth.value = false;
      calculateCalendarOfThreeMonth(checkedDate.value.year, checkedDate.value.month);
    };
    const showWeek = (checkedDatetime = checkedDate.value) => {
      let daysArr = [];
      calendarOfMonth.value[1].forEach((item) => {
        daysArr.push(item.day);
      });
      let dayIndexOfMonth = daysArr.indexOf(checkedDatetime.day);
      if (checkedDatetime.day > 15) {
        dayIndexOfMonth = daysArr.lastIndexOf(checkedDatetime.day);
      }
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
      if (firstDayOfCurrentWeek.month !== checkedDatetime.month || firstDayOfCurrentWeek.day === 1) {
        if (calendarOfMonth.value[0].slice(28, 35)[6].month !== checkedDatetime.month) {
          lastWeek.value = calendarOfMonth.value[0].slice(28, 35);
        } else {
          lastWeek.value = calendarOfMonth.value[0].slice(21, 28);
        }
      } else {
        lastWeek.value = calendarOfMonth.value[1].slice(sliceStart - 7, sliceEnd - 7);
        if (lastWeek.value[selectedDayIndex.value] && lastWeek.value[selectedDayIndex.value].month === checkedDatetime.month) {
          isLastWeekInCurrentMonth.value = true;
        }
      }
      isNextWeekInCurrentMonth.value = false;
      if (lastDayOfCurrentWeek.day < firstDayOfCurrentWeek.day && lastDayOfCurrentWeek.month !== checkedDatetime.month) {
        nextWeek.value = calendarOfMonth.value[2].slice(7, 14);
      } else {
        if (lastDayOfCurrentWeek.day === daysOfMonth(lastDayOfCurrentWeek.year)[lastDayOfCurrentWeek.month]) {
          nextWeek.value = calendarOfMonth.value[2].slice(0, 7);
        } else {
          nextWeek.value = calendarOfMonth.value[1].slice(sliceStart + 7, sliceEnd + 7);
          if (nextWeek.value[selectedDayIndex.value].month === checkedDatetime.month) {
            isNextWeekInCurrentMonth.value = true;
          }
        }
      }
      calendarOfMonthShow.value[0].splice(sliceStart, 7, ...lastWeek.value);
      calendarOfMonthShow.value[2].splice(sliceStart, 7, ...nextWeek.value);
    };
    const changeWeekView = ({ isNext }) => {
      setTimeout(() => {
        isTouching.value = true;
        currentChangeIsScroll.value = true;
        isNext ? getNextWeek() : getLastWeek();
      }, transitionDuration.value * 1e3);
    };
    const getLastWeek = () => {
      let checked = lastWeek.value[selectedDayIndex.value];
      showWeek(checked);
      if (formatDisabledDate(checked))
        return;
      if (!props.scrollChangeDate && currentChangeIsScroll.value) {
        currentChangeIsScroll.value = false;
        return;
      }
      checkedDate.value = checked;
    };
    const getNextWeek = () => {
      let checked = nextWeek.value[selectedDayIndex.value];
      showWeek(checked);
      if (formatDisabledDate(checked))
        return;
      if (!props.scrollChangeDate && currentChangeIsScroll.value) {
        currentChangeIsScroll.value = false;
        return;
      }
      checkedDate.value = checked;
    };
    const getLastMonth = () => {
      translateIndex.value += 1;
      if (!isLastWeekInCurrentMonth.value) {
        yearOfCurrentShow.value = lastMonthYear.value;
        monthOfCurrentShow.value = lastMonth.value;
      }
      calculateCalendarOfThreeMonth(yearOfCurrentShow.value, monthOfCurrentShow.value);
    };
    const getNextMonth = () => {
      translateIndex.value -= 1;
      if (!isNextWeekInCurrentMonth.value) {
        yearOfCurrentShow.value = nextMonthYear.value;
        monthOfCurrentShow.value = nextMonth.value;
      }
      calculateCalendarOfThreeMonth(yearOfCurrentShow.value, monthOfCurrentShow.value);
    };
    const markDateColor = (date, type) => {
      let dateString = `${date.year}/${fillNumber(date.month + 1)}/${fillNumber(date.day)}`;
      let markDateTypeString = markDateTypeObj.value[dateString] || "";
      if (markDateTypeString.indexOf(type) === -1)
        return;
      return markDateColorObj.value[dateString];
    };
    const formatDisabledDate = (date) => {
      if (!date.day)
        return;
      let fDate = new Date(`${date.year}/${date.month + 1}/${date.day}`);
      return props.disabledDate(fDate) || !isDateInRange(fDate, props.minDate, props.maxDate);
    };
    const isDisabledHorizontalScroll = (direc) => {
      let minDate = props.minDate && props.minDate.getTime() - 24 * 60 * 60 * 1e3;
      let maxDate = props.maxDate && props.maxDate.getTime();
      if (isShowWeek.value) {
        let lastWeekLastedDay = new Date(`${lastWeek.value[6].year}/${lastWeek.value[6].month + 1}/${lastWeek.value[6].day}`).getTime();
        let nextWeekFirstDay = new Date(`${nextWeek.value[0].year}/${nextWeek.value[0].month + 1}/${nextWeek.value[0].day}`).getTime();
        if (direc === "left" && maxDate)
          return nextWeekFirstDay >= maxDate;
        if (direc === "right" && minDate)
          return lastWeekLastedDay <= minDate;
      } else {
        let lastMonthLastedDay = new Date(`${lastMonthYear.value}/${lastMonth.value + 1}/${daysOfMonth(lastMonthYear.value)[lastMonth.value]}`).getTime();
        let nextMonthFirstDay = new Date(`${nextMonthYear.value}/${nextMonth.value + 1}/1`).getTime();
        if (direc === "left" && maxDate)
          return nextMonthFirstDay >= maxDate;
        if (direc === "right" && minDate)
          return lastMonthLastedDay <= minDate;
      }
      return false;
    };
    const fillNumber = (val) => {
      return val > 9 ? val : "0" + val;
    };
    const dateFormat = (dateArr) => {
      dateArr.forEach((date, index2) => {
        dateArr[index2] = formatDate(date, "YY/MM/DD");
      });
      return dateArr;
    };
    const isCanScroll = (dire) => {
      const scrollObj = {
        up: [true, "up", "vertical"],
        down: [true, "down", "vertical"],
        left: [true, "left", "horizontal"],
        right: [true, "right", "horizontal"]
      };
      let checkedScrollArr = scrollObj[dire];
      return !checkedScrollArr.some((item) => item === props.disabledScroll);
    };
    const setDisabledScrollDirection = () => {
      touch.value.x < 0 && !isCanScroll("left") && (touch.value.x = 0);
      touch.value.x > 0 && !isCanScroll("right") && (touch.value.x = 0);
      touch.value.y < 0 && !isCanScroll("up") && (touch.value.y = 0);
      touch.value.y > 0 && !isCanScroll("down") && (touch.value.y = 0);
    };
    onMounted(() => {
      initDom();
    });
    watch(() => props.markDate, (val) => {
      val.forEach((item, index2) => {
        if (!item.color) {
          let obj = {};
          obj.color = "#1c71fb";
          if (typeof item === "string" || typeof item === "number") {
            item = [item];
          }
          obj.date = item || [];
          val[index2] = obj;
        }
        val[index2].type = item.type || props.markType || "";
        val[index2].date = dateFormat(val[index2].date);
      });
      markDateColorObj.value = {};
      markDateTypeObj.value = {};
      val.forEach((item) => {
        item.date.forEach((date) => {
          markDateColorObj.value[date] = item.color;
          markDateTypeObj.value[date] = item.type;
        });
      });
    }, { deep: true, immediate: true });
    watch(weekStartIndex, () => {
      calculateCalendarOfThreeMonth(checkedDate.value.year, checkedDate.value.month);
    });
    watch(() => props.defaultDate, (val) => {
      if (!(val instanceof Date)) {
        throw new Error("The calendar component's defaultDate must be date type!");
      }
      checkedDate.value.year = val.getFullYear();
      checkedDate.value.month = val.getMonth();
      checkedDate.value.day = val.getDate();
      calculateCalendarOfThreeMonth(val.getFullYear(), val.getMonth());
      if (isShowWeek.value) {
        showWeek();
      }
    }, { immediate: true });
    watch(checkedDate, (val) => {
      emit("change", val);
    }, { deep: true, immediate: true });
    watch(() => props.show, (val) => {
      if (val) {
        calculateCalendarOfThreeMonth(checkedDate.value.year, checkedDate.value.month);
        initDom();
      }
    }, { immediate: true });
    watch(isShowWeek, (val) => {
      if (val) {
        nextTick(() => {
          showWeek();
        });
      } else {
        nextTick(() => {
          showMonth();
        });
      }
    }, { immediate: true });
    watch(calendarGroupHeight, (val) => {
      emit("height", val + calendarWeekTitleHeight.value);
    });
    watch(() => props.isShowWeekView, (val) => {
      if (val && props.disabledWeekView) {
        throw new Error("'isShowWeekView'\xA0and\xA0'disabledWeekView'\xA0can't\xA0be\xA0used\xA0at\xA0the\xA0same\xA0time");
      }
    }, { immediate: true });
    watch(() => props.disabledWeekView, (val) => {
      if (val && props.isShowWeekView) {
        throw new Error("'isShowWeekView'\xA0and\xA0'disabledWeekView'\xA0can't\xA0be\xA0used\xA0at\xA0the\xA0same\xA0time");
      }
    }, { immediate: true });
    expose({
      today,
      getLastMonth,
      getNextMonth,
      changeWeekView
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", {
        class: "calendar_body",
        style: normalizeStyle({ "margin-top": _ctx.calendarTitleHeight + "px" })
      }, [
        createElementVNode("div", {
          class: "calendar_week",
          ref_key: "weekTitleRef",
          ref: weekTitleRef
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(calendarWeek.value, (item) => {
            return openBlock(), createElementBlock("div", {
              class: "calendar_item",
              key: item
            }, [
              createElementVNode("p", _hoisted_1$4, [
                renderSlot(_ctx.$slots, "week", { week: item }, () => [
                  createTextVNode(toDisplayString(item), 1)
                ], true)
              ])
            ]);
          }), 128))
        ], 512),
        createElementVNode("div", {
          class: "calendar_group",
          style: normalizeStyle({ height: `${calendarGroupHeight.value}px` }),
          ref_key: "calendarRef",
          ref: calendarRef,
          onTouchstart: touchStart,
          onTouchmove: touchMove,
          onTouchend: touchEnd
        }, [
          createElementVNode("ul", {
            style: normalizeStyle({ transform: `translate3d(${-translateIndex.value * 100}%, 0, 0)` })
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(calendarOfMonthShow.value, (item, i) => {
              return openBlock(), createElementBlock("li", {
                class: "calendar_group_li",
                key: i,
                style: normalizeStyle({
                  transform: `translate3d(${(i - 1 + translateIndex.value + (isTouching.value ? touch.value.x : 0)) * 100}%, ${calendarY.value}px, 0)`,
                  transitionDuration: `${isTouching.value ? 0 : transitionDuration.value}s`
                })
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(item, (date, j) => {
                  return openBlock(), createElementBlock("div", {
                    class: normalizeClass([
                      "calendar_item",
                      formatDisabledDate(date) && (_ctx.disabledClassName || "calendar_item_disable")
                    ]),
                    ref_for: true,
                    ref: (el) => {
                      unref(calendarItemRef).length = 0;
                      unref(calendarItemRef).push(el);
                    },
                    key: i + j,
                    onClick: ($event) => clickCalendarDay(date)
                  }, [
                    createElementVNode("div", {
                      class: normalizeClass(["calendar_day", [
                        isFirstDayOfMonth(date, i) && (_ctx.firstDayOfMonthClassName || "calendar_first_today"),
                        isToday(date) && (_ctx.todayClassName || "calendar_day_today"),
                        isCheckedDay(date) && (_ctx.checkedDayClassName || "calendar_day_checked"),
                        isNotCurrentMonthDay(date, i) && (_ctx.notCurrentMonthDayClassName || "calendar_day_not"),
                        markDateColor(date, "circle") && "calendar_mark_circle"
                      ]]),
                      style: normalizeStyle({ "border-color": markDateColor(date, "circle") })
                    }, [
                      renderSlot(_ctx.$slots, "day", {
                        date,
                        extendAttr: {
                          isMarked: !!(markDateColor(date, "circle") || markDateColor(date, "dot")),
                          isDisabledDate: formatDisabledDate(date),
                          isToday: isToday(date),
                          isChecked: isCheckedDay(date),
                          isCurrentMonthDay: !isNotCurrentMonthDay(date, i),
                          isFirstDayOfMonth: isFirstDayOfMonth(date, i)
                        }
                      }, () => [
                        createTextVNode(toDisplayString(isFirstDayOfMonth(date, i) ? language.value.MONTH && language.value.MONTH[date.month] : date.day), 1)
                      ], true)
                    ], 6),
                    createElementVNode("div", {
                      style: normalizeStyle({ background: markDateColor(date, "dot") }),
                      class: "calendar_dot"
                    }, null, 4)
                  ], 10, _hoisted_2$2);
                }), 128))
              ], 4);
            }), 128))
          ], 4)
        ], 36)
      ], 4)), [
        [vShow, _ctx.show]
      ]);
    };
  }
}));
var Calendar = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-965fc926"]]);
const TimePickerProps = {
  defaultTime: {
    type: Date,
    default: null
  },
  show: {
    type: Boolean,
    default: false
  },
  minuteStep: {
    type: Number,
    default: 1
  },
  selectableRange: {
    type: [String, Array],
    default: ""
  },
  calendarDate: {
    type: Object,
    default: () => ({})
  },
  disabledTime: {
    type: Function,
    default: () => {
      return false;
    }
  }
};
var TimePicker_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$3 = { class: "time_body" };
const _hoisted_2$1 = { class: "time_group" };
const _hoisted_3$1 = ["id", "onTouchmove", "onTouchend"];
const __default__$3 = {
  name: "TimePicker"
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$3), {
  props: TimePickerProps,
  emits: ["change"],
  setup(__props, { emit }) {
    const props = __props;
    const hashID = ref([]);
    const hashClass = ref("");
    const checkedDate = ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    });
    const timeHeight = ref(0);
    const timeArray = ref([]);
    const timeStartY = ref(0);
    const timeStartUp = ref(0);
    hashID.value = [
      `time${parseInt(Math.random() * 1e6)}`,
      `time${parseInt(Math.random() * 1e6)}`
    ];
    hashClass.value = `time_item_${parseInt(Math.random() * 1e6)}`;
    const fillNumber = (val) => {
      return val > 9 ? val : "0" + val;
    };
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
        const timeHeightStr = getComputedStyle(document.querySelector(`.${hashClass.value}`)).height || "";
        timeHeight.value = parseFloat(timeHeightStr.split("px")[0]);
        let hoursUp = (2 - parseFloat(checkHours)) * timeHeight.value;
        let minutesUp = (2 - parseFloat(checkMinutes) / props.minuteStep) * timeHeight.value;
        document.querySelector(`#${hashID.value[0]}`).style.webkitTransform = "translate3d(0px," + hoursUp + "px,0px)";
        document.querySelector(`#${hashID.value[1]}`).style.webkitTransform = "translate3d(0px," + minutesUp + "px,0px)";
      });
    };
    const formatDisabledDate = (time, index2) => {
      let hours = index2 === 0 ? time : checkedDate.value.hours;
      let minutes = index2 === 1 ? time : checkedDate.value.minutes;
      let dateStr = `${props.calendarDate.year}/${props.calendarDate.month + 1}/${props.calendarDate.day} ${hours}:${minutes}`;
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
    const timeTouchMove = (e, index2) => {
      let moveEndY = e.changedTouches[0].pageY;
      let Y = moveEndY - timeStartY.value;
      e.currentTarget.style.webkitTransform = "translate3d(0px," + (Y + timeStartUp.value) + "px,0px)";
      if (checkPlatform() === "2") {
        timeTouchEnd(e, index2);
        return false;
      }
    };
    const timeTouchEnd = (e, index2) => {
      let transform = e.currentTarget.style.webkitTransform;
      let endUp = timeStartUp.value;
      if (transform) {
        endUp = parseFloat(e.currentTarget.style.webkitTransform.split(" ")[1].split("px")[0]);
      }
      let distance = Math.abs(endUp - timeStartUp.value);
      let upCount = Math.floor(distance / timeHeight.value) || 1;
      let halfWinWith = timeHeight.value / 2;
      let up = timeStartUp.value;
      if (endUp <= timeStartUp.value) {
        if (distance <= halfWinWith) {
          up = timeStartUp.value;
        } else {
          up = timeStartUp.value - timeHeight.value * upCount;
          if (up < -(timeArray.value[index2].length - 3) * timeHeight.value) {
            up = -(timeArray.value[index2].length - 3) * timeHeight.value;
          }
        }
      } else {
        if (distance <= halfWinWith) {
          up = timeStartUp.value;
        } else {
          up = timeStartUp.value + timeHeight.value * upCount;
          if (up > timeHeight.value * 2) {
            up = timeHeight.value * 2;
          }
        }
      }
      if (index2 === 0) {
        let hour = 2 - Math.round(parseFloat(up) / parseFloat(timeHeight.value));
        if (formatDisabledDate(hour, index2)) {
          up = timeStartUp.value;
        } else {
          checkedDate.value.hours = hour;
        }
      } else {
        let minute = 2 - Math.round(parseFloat(up) / parseFloat(timeHeight.value));
        if (formatDisabledDate(minute, index2)) {
          up = timeStartUp.value;
        } else {
          checkedDate.value.minutes = minute * props.minuteStep;
        }
      }
      e.currentTarget.style.webkitTransition = "transform 300ms";
      e.currentTarget.style.webkitTransform = "translate3d(0px," + up + "px,0px)";
    };
    const isBeSelectedTime = (time, index2) => {
      return index2 === 0 && time === checkedDate.value.hours || index2 === 1 && time === checkedDate.value.minutes;
    };
    const checkTimeRange = (range) => {
      if (!range)
        return;
      let timeArr = range.split("-");
      if (timeArr.length === 0 || timeArr.length > 2)
        return false;
      return timeArr.every((time) => {
        let mhArr = time.split(":");
        if (mhArr.length === 0 || mhArr.length > 2)
          return false;
        if (parseInt(mhArr[0]) < 0 || parseInt(mhArr[0]) > 24)
          return false;
        if (parseInt(mhArr[1]) < 0 || parseInt(mhArr[1]) > 59)
          return false;
        if (parseInt(mhArr[0]) === 24 && parseInt(mhArr[1]) > 0)
          return false;
        return true;
      });
    };
    watch(() => props.defaultTime, (val) => {
      if (!(val instanceof Date)) {
        throw new Error("The calendar component's defaultTime must be date type!");
      }
      checkedDate.value.hours = val.getHours();
      checkedDate.value.minutes = val.getMinutes();
    }, { immediate: true });
    watch(checkedDate, (val) => {
      emit("change", val);
    }, { deep: true, immediate: true });
    watch(() => props.show, (val) => {
      if (val) {
        initTimeArray();
      }
    }, { immediate: true });
    watch(() => props.minuteStep, (val) => {
      if (val <= 0 || val >= 60) {
        throw new Error(`The minutes-step can't be: ${val}!`);
      }
      if (60 % val !== 0) {
        throw new Error("The minutes-step must be divided by 60!");
      }
    }, { immediate: true });
    watch(() => props.selectableRange, (val) => {
      if (!val)
        return;
      let formatPass = false;
      if (typeof val === "string") {
        formatPass = checkTimeRange(val);
      } else if (val instanceof Array) {
        formatPass = val.every((item) => checkTimeRange(item));
      }
      if (!formatPass)
        throw new Error("The format of selectableRange is error!");
    }, { immediate: true });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", _hoisted_1$3, [
        createElementVNode("div", _hoisted_2$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(timeArray.value, (item, index2) => {
            return openBlock(), createElementBlock("div", {
              class: "time_content",
              id: hashID.value[index2],
              key: index2,
              onTouchstart: timeTouchStart,
              onTouchmove: ($event) => timeTouchMove($event, index2),
              onTouchend: ($event) => timeTouchEnd($event, index2)
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(item, (time, j) => {
                return openBlock(), createElementBlock("div", {
                  class: normalizeClass(["time_item", [
                    { time_item_show: isBeSelectedTime(time, index2) },
                    hashClass.value,
                    { "time-disabled": formatDisabledDate(time, index2) }
                  ]]),
                  key: index2 + j
                }, toDisplayString(fillNumber(time)), 3);
              }), 128))
            ], 40, _hoisted_3$1);
          }), 128))
        ])
      ], 512)), [
        [vShow, _ctx.show]
      ]);
    };
  }
}));
var TimePicker = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-52274175"]]);
const ScrollContainerProps = {
  disabledScroll: {
    type: [Boolean, String],
    default: false
  },
  calendarData: {
    type: Array,
    default: () => []
  }
};
var ScrollContainer_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$2 = ["onTouchmove"];
const __default__$2 = { name: "ScrollContainer" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$2), {
  props: ScrollContainerProps,
  emits: [
    "slidechange",
    "touchstart",
    "touchmove",
    "touchend"
  ],
  setup(__props, { emit }) {
    const props = __props;
    const containerRef = ref(null);
    const translateIndex = ref(0);
    const transitionDuration = ref(0.3);
    const touch = ref({
      x: 0,
      y: 0
    });
    const isTouching = ref(false);
    const touchStartPositionX = ref(0);
    const touchStartPositionY = ref(0);
    const calendarY = ref(0);
    const touchStart = (event) => {
      emit("touchstart", event);
      touchStartPositionX.value = event.touches[0].clientX;
      touchStartPositionY.value = event.touches[0].clientY;
      touch.value = {
        x: 0,
        y: 0
      };
      isTouching.value = true;
    };
    const touchMove = (event) => {
      var _a, _b;
      emit("touchmove", event);
      let moveX = event.touches[0].clientX - touchStartPositionX.value;
      let moveY = event.touches[0].clientY - touchStartPositionY.value;
      if (Math.abs(moveX) > Math.abs(moveY)) {
        touch.value = {
          x: moveX / ((_a = containerRef.value) == null ? void 0 : _a.offsetWidth),
          y: 0
        };
      } else {
        touch.value = {
          x: 0,
          y: moveY / ((_b = containerRef.value) == null ? void 0 : _b.offsetHeight)
        };
      }
      setDisabledScrollDirection();
    };
    const touchEnd = (e) => {
      var _a;
      emit("touchend", e);
      isTouching.value = false;
      if (Math.abs(touch.value.x) > Math.abs(touch.value.y) && Math.abs(touch.value.x) > 0.2) {
        if (touch.value.x > 0) {
          emit("slidechange", "right");
          translateIndex.value += 1;
        } else if (touch.value.x < 0) {
          emit("slidechange", "left");
          translateIndex.value -= 1;
        }
      }
      if (Math.abs(touch.value.y) > Math.abs(touch.value.x) && Math.abs(touch.value.y * ((_a = containerRef.value) == null ? void 0 : _a.offsetHeight)) > 50) {
        if (touch.value.y > 0) {
          emit("slidechange", "down");
        } else if (touch.value.y < 0) {
          emit("slidechange", "up");
        }
      } else {
        touch.value = {
          x: 0,
          y: 0
        };
      }
    };
    const isCanScroll = (dire) => {
      const scrollObj = {
        up: [true, "up", "vertical"],
        down: [true, "down", "vertical"],
        left: [true, "left", "horizontal"],
        right: [true, "right", "horizontal"]
      };
      let checkedScrollArr = scrollObj[dire];
      return !checkedScrollArr.some((item) => item === props.disabledScroll);
    };
    const setDisabledScrollDirection = () => {
      touch.value.x < 0 && !isCanScroll("left") && (touch.value.x = 0);
      touch.value.x > 0 && !isCanScroll("right") && (touch.value.x = 0);
      touch.value.y < 0 && !isCanScroll("up") && (touch.value.y = 0);
      touch.value.y > 0 && !isCanScroll("down") && (touch.value.y = 0);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("ul", {
        class: "calendar_group_ul",
        ref_key: "containerRef",
        ref: containerRef,
        style: normalizeStyle({ transform: `translate3d(${-translateIndex.value * 100}%, 0, 0)` }),
        onTouchstart: touchStart,
        onTouchmove: withModifiers(touchMove, ["stop", "prevent"]),
        onTouchend: touchEnd
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.calendarData, (item, i) => {
          return openBlock(), createElementBlock("li", {
            class: "calendar_group_li",
            key: i,
            style: normalizeStyle({
              transform: `translate3d(${(i - 1 + translateIndex.value + (isTouching.value ? touch.value.x : 0)) * 100}%, ${calendarY.value}px, 0)`,
              transitionDuration: `${isTouching.value ? 0 : transitionDuration.value}s`
            })
          }, [
            renderSlot(_ctx.$slots, "default", { currArr: item }, void 0, true)
          ], 4);
        }), 128))
      ], 44, _hoisted_1$2);
    };
  }
}));
var ScrollContainer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-3aec9a40"]]);
const YearMonthPickerProps = {
  minDate: {
    type: Date,
    default: null
  },
  maxDate: {
    type: Date,
    default: null
  },
  disabledDate: {
    type: Function,
    default: () => {
      return false;
    }
  },
  scrollChangeDate: {
    type: Boolean,
    default: true
  },
  checkedDayClassName: {
    type: String,
    default: ""
  },
  notCurrentMonthDayClassName: {
    type: String,
    default: ""
  },
  disabledClassName: {
    type: String,
    default: ""
  },
  type: String,
  calendarTitleHeight: {
    type: Number,
    default: 0
  },
  calendarContentHeight: {
    type: Number,
    default: 0
  },
  disabledScroll: {
    type: [Boolean, String],
    default: false
  },
  calendarDate: {
    type: Object,
    default: () => {
      return {
        year: new Date().getFullYear,
        month: new Date().getMonth,
        day: new Date().getDate
      };
    }
  },
  lang: {
    type: String,
    default: "CN"
  }
};
var YearMonthPicker_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1$1 = ["onClick"];
const __default__$1 = {
  name: "YearMonthPicker"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$1), {
  props: YearMonthPickerProps,
  emits: [
    "click",
    "slidechange",
    "touchstart",
    "touchmove",
    "touchend"
  ],
  setup(__props, { emit }) {
    const props = __props;
    const language = ref({});
    const yearRange = ref(10);
    const disabledScrollDirec = ref(false);
    const yearMonthShow = ref([]);
    language.value = languageUtil[props.lang.toUpperCase()];
    const itemHeight = computed(() => (props.calendarContentHeight - props.calendarTitleHeight) / 4);
    const initYear = (year) => {
      const yearArr = [];
      const currYear = `${year || props.calendarDate.year}`;
      const yearStart = parseInt(currYear.substring(0, 3) + "0");
      for (let i = 0; i <= yearRange.value; i++) {
        yearArr.push(yearStart + i);
      }
      yearArr.unshift(yearStart - 1);
      return yearArr;
    };
    const initYearRange = (year) => {
      const yearRangeArr = [];
      const currYear = `${year || props.calendarDate.year}`;
      const yearStart = parseInt(currYear.substring(0, 2) + "00");
      for (let i = 0; i <= yearRange.value; i++) {
        yearRangeArr.push({ s: yearStart + i * 10, e: yearStart + i * 10 + 9 });
      }
      yearRangeArr.unshift({ s: yearStart - 10, e: yearStart - 1 });
      return yearRangeArr;
    };
    const slideChange = (direc) => {
      if (direc === "left") {
        getNextOpitonData();
      } else if (direc === "right") {
        getLastOptionData();
      }
      emit("slidechange", direc);
    };
    const getNextOpitonData = () => {
      if (props.type === "year") {
        const year = yearMonthShow.value[2][1];
        yearMonthShow.value = getThreeYearArr(year);
      } else if (props.type === "yearRange") {
        const year = yearMonthShow.value[2][1].s;
        yearMonthShow.value = getThreeYearRangeArr(year);
      }
    };
    const getLastOptionData = () => {
      if (props.type === "year") {
        const year = yearMonthShow.value[0][1];
        yearMonthShow.value = getThreeYearArr(year);
      } else if (props.type === "yearRange") {
        const year = yearMonthShow.value[0][1].s;
        yearMonthShow.value = getThreeYearRangeArr(year);
      }
    };
    const getThreeYearArr = (year = props.calendarDate.year) => {
      year = year + "";
      const yearStartLast = parseInt(parseInt(year.substring(0, 3)) - 1 + "0");
      const yearStartCurr = parseInt(year.substring(0, 3) + "0");
      const yearStartNext = parseInt(parseInt(year.substring(0, 3)) + 1 + "0");
      return [
        initYear(yearStartLast),
        initYear(yearStartCurr),
        initYear(yearStartNext)
      ];
    };
    const getThreeYearRangeArr = (year = props.calendarDate.year) => {
      year = year + "";
      const yearStartLast = parseInt(parseInt(year.substring(0, 2)) - 1 + "00");
      const yearStartCurr = parseInt(year.substring(0, 2) + "00");
      const yearStartNext = parseInt(parseInt(year.substring(0, 2)) + 1 + "00");
      return [
        initYearRange(yearStartLast),
        initYearRange(yearStartCurr),
        initYearRange(yearStartNext)
      ];
    };
    const dateClick = (date, index2) => {
      if (!date)
        return;
      if (isDisabled(date, index2))
        return;
      let checkedDate = __spreadProps(__spreadValues({}, props.calendarDate), { type: props.type });
      if (props.type === "month") {
        checkedDate = __spreadProps(__spreadValues({}, checkedDate), {
          month: index2
        });
      }
      if (props.type === "year") {
        checkedDate = __spreadProps(__spreadValues({}, checkedDate), {
          year: date
        });
      }
      if (props.type === "yearRange") {
        const yearArr = getRangeYear(date);
        checkedDate = __spreadProps(__spreadValues({}, checkedDate), {
          year: yearArr.includes(checkedDate.year) ? checkedDate.year : date.s
        });
      }
      emit("click", checkedDate);
    };
    const isChecked = (date, index2) => {
      if (props.type === "month") {
        return index2 === props.calendarDate.month;
      }
      if (props.type === "year") {
        return date === props.calendarDate.year;
      }
      if (props.type === "yearRange") {
        return date.s <= props.calendarDate.year && date.e >= props.calendarDate.year;
      }
    };
    const isNotCurrent = (index2) => {
      return (index2 === 0 || index2 === 11) && (props.type === "year" || props.type === "yearRange");
    };
    const isDisabled = (date, index2) => {
      let fDate = new Date();
      if (props.type === "month") {
        fDate = new Date(`${props.calendarDate.year}/${parseInt(index2) + 1}/${props.calendarDate.day}`);
      } else if (props.type === "year") {
        fDate = new Date(`${date}/${parseInt(props.calendarDate.month) + 1}/${props.calendarDate.day}`);
      } else if (props.type === "yearRange") {
        const yearArr = getRangeYear(date);
        return yearArr.every((year) => {
          fDate = new Date(`${year}/${parseInt(props.calendarDate.month) + 1}/${props.calendarDate.day}`);
          return props.disabledDate(fDate) || !isDateInRange(fDate, props.minDate, props.maxDate);
        });
      }
      return props.disabledDate(fDate) || !isDateInRange(fDate, props.minDate, props.maxDate);
    };
    const getRangeYear = (date) => {
      const yearStart = date.s;
      const yearEnd = date.e;
      const yearArr = [];
      for (let i = yearStart; i <= yearEnd; i++) {
        yearArr.push(i);
      }
      return yearArr;
    };
    const touchStart = (event) => {
      emit("touchstart", event);
    };
    const touchMove = (event) => {
      emit("touchmove", event);
    };
    const touchEnd = (event) => {
      emit("touchend", event);
    };
    watch(() => props.type, (val) => {
      disabledScrollDirec.value = props.disabledScroll;
      if (val === "month") {
        disabledScrollDirec.value = true;
        yearMonthShow.value = [
          language.value.MONTH,
          language.value.MONTH,
          language.value.MONTH
        ];
      } else if (val === "year") {
        yearMonthShow.value = getThreeYearArr();
      } else if (val === "yearRange") {
        yearMonthShow.value = getThreeYearRangeArr();
      }
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", {
        class: "year-body",
        style: normalizeStyle({ top: _ctx.calendarTitleHeight + "px", height: unref(itemHeight) * 4 + "px" })
      }, [
        createVNode(ScrollContainer, {
          calendarData: yearMonthShow.value,
          disabledScroll: disabledScrollDirec.value,
          onTouchstart: touchStart,
          onTouchmove: touchMove,
          onTouchend: touchEnd,
          onSlidechange: slideChange
        }, {
          default: withCtx((scope) => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(scope.currArr, (item, index2) => {
              return openBlock(), createElementBlock("div", {
                class: normalizeClass(["year-body-item", [
                  isDisabled(item, index2) && (_ctx.disabledClassName || "is_disabled")
                ]]),
                style: normalizeStyle({ height: unref(itemHeight) + "px" }),
                key: index2,
                onClick: ($event) => dateClick(item, index2)
              }, [
                createElementVNode("p", {
                  class: normalizeClass(["year-body-item-content", [
                    isChecked(item, index2) && (_ctx.checkedDayClassName || "is_checked"),
                    isNotCurrent(index2) && (_ctx.notCurrentMonthDayClassName || "is_not_current")
                  ]]),
                  style: normalizeStyle({ width: _ctx.type === "yearRange" ? "92px" : "60px" })
                }, toDisplayString(_ctx.type === "yearRange" ? `${item.s}-${item.e}` : _ctx.type === "month" ? language.value.MONTH[index2] : item), 7)
              ], 14, _hoisted_1$1);
            }), 128))
          ]),
          _: 1
        }, 8, ["calendarData", "disabledScroll"])
      ], 4)), [
        [vShow, ["year", "yearRange", "month"].includes(_ctx.type)]
      ]);
    };
  }
}));
var YearMonthPicker = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-104a379e"]]);
const ARROW_DOWN_IMG = "data:image/png;base64,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";
const ARROW_UP_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAANp0lEQVR4Xu2dbYwdZRXHz7m7l94LSsluKr6kwRqINQtsd2Y0kagxEqsfNFFJipSKTTUajRWKEcSWlhIltFhE40uCWAotGDDRDxg1kcQPSk3MzNysa1HTagMYI5WtvNTQ7C5zzFOngLAv954789y59/zna+c8z5zfmV/PnX3uM5cJBwiAwIIEGGxAAAQWJgBBcHeAwCIEIAhuDxCAILgHQEBHAB1Exw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAECOFRpo6AhBExw1RRghAEI+FfuKJJ5pPPfXU2izLJk5PKyLP1Wq1XwRB8KjHS8FUbRKAIG2C6ua0NE3fmWXZ9US0lpmbC4x1hIgOjIyM7Fq1atXJbuZDbHEEIEhxLOcdKUmS3UT05XanEZG/Dg0NXTUxMXGw3RicVx4BCFIS28nJyQvn5uYeJKK3KabIROSO0dHRregmCnoFhkCQAmG6oUSkliTJdcy8k4jO6HL4I0NDQ1euWbPm912Og3AlAQiiBDdf2OTk5Kq5ubkDRHRJgcOimxQIs9OhIEinxBY4P0mSzxDRHiJ6TUFDvnIYdJOSwC42LATpEnqapitE5F4i+mCXQ7UT7rrJN0dHR7fh2aQdXN2fA0G6YJgkyUdF5AfMPNrFMJpQdBMNNUUMBFFAO3z48NnPPvvsd4logyK8qBB0k6JILjIOBOkQcpIk7yMi95HqTR2GlnU6uklZ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";
const DatetimePickerProps = {
  themeColor: {
    type: Object,
    default: () => {
    }
  },
  changeYearFast: {
    type: Boolean,
    default: false
  },
  isShowArrow: {
    type: Boolean,
    default: false
  },
  isShowWeekView: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: false
  },
  isShowAction: {
    type: Boolean,
    default: true
  },
  pickerType: {
    type: String,
    default: "datetime"
  },
  showTodayButton: {
    type: Boolean,
    default: true
  },
  defaultDatetime: {
    type: Date,
    default() {
      return new Date();
    }
  },
  format: null,
  model: {
    type: String,
    default: "inline"
  },
  markDate: {
    type: Array,
    default: () => []
  },
  disabledDate: {
    type: Function,
    default: () => {
      return false;
    }
  },
  lang: {
    type: String,
    default: "CN"
  }
};
var DatetimePicker_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = { class: "calendar_title_date" };
const _hoisted_2 = ["onClick"];
const _hoisted_3 = ["src"];
const __default__ = {
  name: "VueHashCalendar"
};
const _sfc_main = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__), {
  props: DatetimePickerProps,
  emits: [
    "update:visible",
    "update:isShowWeekView",
    "calendarTypeChange",
    "click",
    "confirm",
    "change",
    "slidechange",
    "touchstart",
    "touchmove",
    "touchend"
  ],
  setup(__props, { expose, emit }) {
    const props = __props;
    const defaultDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes()
    };
    const calendarTitleRef = ref(null);
    const calendarRef = ref(null);
    const arrowDownImg = ARROW_DOWN_IMG;
    const arrowUpImg = ARROW_UP_IMG;
    const language = ref({});
    const checkedDate = ref(defaultDate);
    const isShowCalendar = ref(false);
    const calendarBodyHeight = ref(0);
    const calendarTitleHeight = ref(0);
    const firstTimes = ref(true);
    const currDateTime = ref(new Date());
    const yearMonthType = ref("date");
    language.value = languageUtil[props.lang.toUpperCase()];
    const isShowDatetimePicker = computed({
      get() {
        return props.visible;
      },
      set(val) {
        emit("update:visible", val);
      }
    });
    if (props.model === "inline") {
      isShowDatetimePicker.value = true;
    }
    const isShowWeek = computed({
      get() {
        return props.isShowWeekView;
      },
      set(val) {
        emit("update:isShowWeekView", val);
      }
    });
    const isShowArrowImg = computed(() => props.isShowArrow && props.model === "inline");
    const calendarContentHeight = computed(() => calendarBodyHeight.value + calendarTitleHeight.value);
    const slots = useSlots();
    const hasSlot = (slotName) => {
      var _a;
      return !!((_a = slots == null ? void 0 : slots[slotName]) == null ? void 0 : _a.call(slots));
    };
    const toggleWeek = () => {
      isShowWeek.value = !isShowWeek.value;
      if (isShowWeek.value)
        slideChange("up");
      else
        slideChange("down");
    };
    const today = () => {
      var _a;
      if (props.disabledDate(new Date()))
        return;
      (_a = calendarRef.value) == null ? void 0 : _a.today();
    };
    const lastMonth = () => {
      var _a;
      (_a = calendarRef.value) == null ? void 0 : _a.getLastMonth();
    };
    const nextMonth = () => {
      var _a;
      (_a = calendarRef.value) == null ? void 0 : _a.getNextMonth();
    };
    const lastWeek = () => {
      var _a, _b;
      (_a = calendarRef.value) == null ? void 0 : _a.getLastMonth();
      (_b = calendarRef.value) == null ? void 0 : _b.changeWeekView({ isNext: false });
    };
    const nextWeek = () => {
      var _a, _b;
      (_a = calendarRef.value) == null ? void 0 : _a.getNextMonth();
      (_b = calendarRef.value) == null ? void 0 : _b.changeWeekView({ isNext: true });
    };
    const dateChange = (date) => {
      date.hours = checkedDate.value.hours;
      date.minutes = checkedDate.value.minutes;
      checkedDate.value = date;
    };
    const dateClick = (date) => {
      date.hours = checkedDate.value.hours;
      date.minutes = checkedDate.value.minutes;
      checkedDate.value = date;
      let fDate = new Date(`${checkedDate.value.year}/${checkedDate.value.month + 1}/${checkedDate.value.day} ${checkedDate.value.hours}:${checkedDate.value.minutes}`);
      if (props.format) {
        fDate = formatDate(fDate, props.format, props.lang);
      }
      if (date.type) {
        switch (date.type) {
          case "yearRange":
            yearMonthType.value = "year";
            break;
          case "year":
            yearMonthType.value = "month";
            break;
          case "month":
            currDateTime.value = new Date(fDate);
            yearMonthType.value = "date";
            break;
        }
        emit("calendarTypeChange", yearMonthType.value);
      }
      emit("click", fDate);
    };
    const timeChange = (date) => {
      date.year = checkedDate.value.year;
      date.month = checkedDate.value.month;
      date.day = checkedDate.value.day;
      checkedDate.value = date;
    };
    const confirm = () => {
      let date = new Date(`${checkedDate.value.year}/${checkedDate.value.month + 1}/${checkedDate.value.day} ${checkedDate.value.hours}:${checkedDate.value.minutes}`);
      if (props.format) {
        date = formatDate(date, props.format, props.lang);
      }
      emit("confirm", date);
      if (props.model === "dialog") {
        close();
      }
    };
    const close = () => {
      isShowDatetimePicker.value = false;
    };
    const fillNumber = (val) => {
      return val > 9 ? val : "0" + val;
    };
    const formatDatetime = (time, format) => {
      return formatDate(time, format, props.lang);
    };
    const showCalendar = () => {
      if (isShowCalendar.value) {
        showYearMonthPicker();
      }
      isShowCalendar.value = true;
    };
    const showTime = () => {
      isShowCalendar.value = false;
      yearMonthType.value = "date";
    };
    const showYearMonthPicker = () => {
      if (!props.changeYearFast)
        return;
      if (yearMonthType.value === "date") {
        yearMonthType.value = "month";
      } else if (yearMonthType.value === "month") {
        yearMonthType.value = "year";
      } else if (yearMonthType.value === "year") {
        yearMonthType.value = "yearRange";
      } else {
        yearMonthType.value = "date";
      }
      emit("calendarTypeChange", yearMonthType.value);
    };
    const heightChange = (height) => {
      if (!firstTimes.value && props.model === "dialog")
        return;
      calendarBodyHeight.value = height;
      firstTimes.value = false;
    };
    const changeThemeColor = () => {
      const themeColorKeys = Object.keys(props.themeColor || {});
      if (themeColorKeys.length) {
        let cssText = "";
        themeColorKeys.forEach((k) => {
          cssText += `--hash-calendar-${k}: ${props.themeColor[k]};`;
        });
        nextTick(() => {
          document.querySelector(".hash-calendar").style.cssText = cssText;
        });
      }
    };
    const touchStart = (event) => {
      emit("touchstart", event);
    };
    const touchMove = (event) => {
      emit("touchmove", event);
    };
    const touchEnd = (event) => {
      emit("touchend", event);
    };
    const slideChange = (direction) => {
      emit("slidechange", direction);
    };
    watch(() => props.themeColor, (val) => {
      val && changeThemeColor();
    }, { immediate: true });
    watch(() => props.defaultDatetime, (val) => {
      if (!(val instanceof Date)) {
        throw new Error("The calendar component's defaultDate must be date type!");
      }
      currDateTime.value = val;
    }, { immediate: true });
    watch(() => props.pickerType, (val) => {
      if (val === "time") {
        showTime();
      }
    }, { immediate: true });
    watch(() => props.isShowAction, (flag) => {
      if (!flag) {
        calendarTitleHeight.value = 0;
      } else {
        setTimeout(() => {
          var _a;
          calendarTitleHeight.value = ((_a = calendarTitleRef.value) == null ? void 0 : _a.offsetHeight) || 0;
        });
      }
    });
    watch(checkedDate, () => {
      let date = new Date(`${checkedDate.value.year}/${checkedDate.value.month + 1}/${checkedDate.value.day} ${checkedDate.value.hours}:${checkedDate.value.minutes}`);
      if (props.format) {
        date = formatDate(date, props.format, props.lang);
      }
      emit("change", date);
    }, { deep: true });
    watch(() => props.visible, (val) => {
      isShowCalendar.value = val;
      setTimeout(() => {
        var _a;
        calendarTitleHeight.value = ((_a = calendarTitleRef.value) == null ? void 0 : _a.offsetHeight) || 0;
      });
    }, { immediate: true });
    expose({
      today,
      lastMonth,
      nextMonth,
      lastWeek,
      nextWeek
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", {
        class: normalizeClass(["hash-calendar", { calendar_inline: _ctx.model === "inline" }]),
        style: normalizeStyle({
          height: `${_ctx.model === "inline" ? unref(calendarContentHeight) + (unref(isShowArrowImg) ? 30 : 0) : void 0}px`
        }),
        onClick: close
      }, [
        createElementVNode("div", {
          class: "calendar_content",
          style: normalizeStyle({
            height: `${unref(calendarContentHeight)}px`,
            bottom: `${unref(isShowArrowImg) ? 30 : 0}px`
          }),
          onClick: _cache[1] || (_cache[1] = withModifiers(() => {
          }, ["stop"]))
        }, [
          _ctx.isShowAction ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "calendar_title",
            ref_key: "calendarTitleRef",
            ref: calendarTitleRef
          }, [
            renderSlot(_ctx.$slots, "action", {}, () => [
              createElementVNode("div", _hoisted_1, [
                _ctx.pickerType !== "time" ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  class: normalizeClass(["calendar_title_date_year", { calendar_title_date_active: isShowCalendar.value }]),
                  onClick: showCalendar
                }, toDisplayString(formatDatetime(`${checkedDate.value.year}/${checkedDate.value.month + 1}/${checkedDate.value.day}`, language.value.DEFAULT_DATE_FORMAT)), 3)) : createCommentVNode("", true),
                _ctx.pickerType !== "date" ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  class: normalizeClass(["calendar_title_date_time", { calendar_title_date_active: !isShowCalendar.value }]),
                  onClick: showTime
                }, toDisplayString(formatDatetime(`${checkedDate.value.year}/${checkedDate.value.month + 1}/${checkedDate.value.day} ${fillNumber(checkedDate.value.hours)}:${fillNumber(checkedDate.value.minutes)}`, language.value.DEFAULT_TIME_FORMAT)), 3)) : createCommentVNode("", true)
              ]),
              _ctx.showTodayButton ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["calendar_confirm", { today_disable: props.disabledDate(new Date()) }]),
                onClick: today
              }, [
                renderSlot(_ctx.$slots, "today", {}, () => [
                  createTextVNode(toDisplayString(language.value.TODAY), 1)
                ], true)
              ], 2)) : createCommentVNode("", true),
              _ctx.model === "dialog" ? (openBlock(), createElementBlock("div", {
                key: 1,
                class: "calendar_confirm",
                onClick: confirm
              }, [
                renderSlot(_ctx.$slots, "confirm", {}, () => [
                  createTextVNode(toDisplayString(language.value.CONFIRM), 1)
                ], true)
              ])) : createCommentVNode("", true)
            ], true)
          ], 512)) : createCommentVNode("", true),
          _ctx.pickerType !== "time" ? (openBlock(), createBlock(Calendar, mergeProps({
            key: 1,
            ref_key: "calendarRef",
            ref: calendarRef,
            show: isShowCalendar.value,
            modelValue: unref(isShowWeek),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(isShowWeek) ? isShowWeek.value = $event : null)
          }, __spreadValues(__spreadValues({}, _ctx.$props), _ctx.$attrs), {
            calendarTitleHeight: calendarTitleHeight.value,
            onHeight: heightChange,
            "default-date": currDateTime.value,
            onTouchstart: touchStart,
            onTouchmove: touchMove,
            onTouchend: touchEnd,
            onSlidechange: slideChange,
            onChange: dateChange,
            onClick: dateClick
          }), createSlots({ _: 2 }, [
            hasSlot("week") ? {
              name: "week",
              fn: withCtx((scope) => [
                renderSlot(_ctx.$slots, "week", {
                  week: scope.week
                }, void 0, true)
              ])
            } : void 0,
            hasSlot("day") ? {
              name: "day",
              fn: withCtx((scope) => [
                renderSlot(_ctx.$slots, "day", {
                  date: scope.date,
                  extendAttr: scope.extendAttr
                }, void 0, true)
              ])
            } : void 0
          ]), 1040, ["show", "modelValue", "calendarTitleHeight", "default-date"])) : createCommentVNode("", true),
          _ctx.pickerType !== "date" ? (openBlock(), createBlock(TimePicker, mergeProps({
            key: 2,
            show: !isShowCalendar.value,
            "default-time": currDateTime.value,
            calendarDate: checkedDate.value
          }, __spreadValues(__spreadValues({}, _ctx.$props), _ctx.$attrs), { onChange: timeChange }), null, 16, ["show", "default-time", "calendarDate"])) : createCommentVNode("", true),
          _ctx.changeYearFast ? (openBlock(), createBlock(YearMonthPicker, mergeProps({
            key: 3,
            calendarTitleHeight: calendarTitleHeight.value,
            calendarContentHeight: unref(calendarContentHeight),
            calendarDate: checkedDate.value,
            onTouchstart: touchStart,
            onTouchmove: touchMove,
            onTouchend: touchEnd,
            onSlidechange: slideChange
          }, __spreadValues(__spreadValues({}, _ctx.$props), _ctx.$attrs), {
            onClick: dateClick,
            type: yearMonthType.value
          }), null, 16, ["calendarTitleHeight", "calendarContentHeight", "calendarDate", "type"])) : createCommentVNode("", true)
        ], 4),
        unref(isShowArrowImg) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "ctrl-img",
          onClick: withModifiers(toggleWeek, ["stop"]),
          style: normalizeStyle({ "margin-top": `${unref(calendarContentHeight)}px` })
        }, [
          renderSlot(_ctx.$slots, "arrow", { show: unref(isShowWeek) }, () => [
            createElementVNode("img", {
              src: unref(isShowWeek) ? unref(arrowDownImg) : unref(arrowUpImg)
            }, null, 8, _hoisted_3)
          ], true)
        ], 12, _hoisted_2)) : createCommentVNode("", true)
      ], 6)), [
        [vShow, unref(isShowDatetimePicker)]
      ]);
    };
  }
}));
var DatetimePicker = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0b659b6a"]]);
const components = [DatetimePicker];
const install = function(Vue) {
  if (install.installed)
    return;
  components.map((component) => Vue.component(component.name, component));
};
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
var index = __spreadValues({
  install
}, components);
export { index as default };
