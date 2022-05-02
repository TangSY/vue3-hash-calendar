import { LanguageTypes } from "../language";

export const CalendarProps = {
  // 最小可选日期
  minDate: {
    type: Date,
    default: null,
  },
  // 最大可选日期
  maxDate: {
    type: Date,
    default: null,
  },
  // 每月第一天的 className
  firstDayOfMonthClassName: {
    type: String,
    default: "",
  },
  // 操作栏高度
  calendarTitleHeight: {
    type: Number,
    default: 0,
  },
  // 当天日期的 className
  todayClassName: {
    type: String,
    default: "",
  },
  // 日期被选中时的 className
  checkedDayClassName: {
    type: String,
    default: "",
  },
  // 不是当前展示月份日期的 className(例如日历前面几天与后面几天灰色部分)
  notCurrentMonthDayClassName: {
    type: String,
    default: "",
  },
  // 日期被禁用时的 className
  disabledClassName: {
    type: String,
    default: "",
  },
  // 滑动的时候，是否触发改变日期
  scrollChangeDate: {
    type: Boolean,
    default: true,
  },
  // 禁用周视图
  disabledWeekView: {
    type: Boolean,
    default: false,
  },
  defaultDate: {
    type: Date,
    default() {
      return new Date();
    },
  },
  show: {
    type: Boolean,
    default: false,
  },
  weekStart: {
    type: String,
    default: "Sunday",
  },
  // 是否展示非本月日期
  isShowNotCurrentMonthDay: {
    type: Boolean,
    default: true,
  },
  // 是否展示周视图
  isShowWeekView: {
    type: Boolean,
    default: false,
  },
  // 日期下面的标记
  markDate: {
    type: Array,
    default: () => [],
  },
  // 日期标记类型
  markType: {
    type: String,
    default: "dot",
  },
  // 禁用的日期
  disabledDate: {
    type: Function,
    default: () => {
      return false;
    },
  },
  // 禁止滑动，可选值【left, right, up, down, horizontal, vertical, true, false】
  disabledScroll: {
    type: [Boolean, String],
    default: false,
  },
  // 使用的语言包
  lang: {
    type: String,
    values: LanguageTypes,
    default: "CN",
  },
};
