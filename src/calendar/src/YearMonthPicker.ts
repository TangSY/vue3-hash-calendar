export const YearMonthPickerProps = {
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
  // 禁用的日期
  disabledDate: {
    type: Function,
    default: () => {
      return false;
    },
  },
  // 滑动的时候，是否触发改变日期
  scrollChangeDate: {
    type: Boolean,
    default: true,
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
  type: String,
  // 操作栏高度
  calendarTitleHeight: {
    type: Number,
    default: 0,
  },
  // 日历内容区域高度
  calendarContentHeight: {
    type: Number,
    default: 0,
  },
  // 禁止滑动，可选值【left, right, up, down, horizontal, vertical, true, false】
  disabledScroll: {
    type: [Boolean, String],
    default: false,
  },
  // 日历选中的日期 {year, month, day}
  calendarDate: {
    type: Object,
    default: () => {
      return {
        year: new Date().getFullYear,
        month: new Date().getMonth,
        day: new Date().getDate,
      };
    },
  },
  // 使用的语言包
  lang: {
    type: String,
    default: "CN",
  },
};
