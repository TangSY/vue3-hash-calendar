export const TimePickerProps = {
  defaultTime: {
    type: Date,
    default: null,
  },
  show: {
    type: Boolean,
    default: false,
  },
  minuteStep: {
    type: Number,
    default: 1,
  },
  selectableRange: {
    type: [String, Array],
    default: "",
  },
  // 日历选中的时间 {year, month, day}
  calendarDate: {
    type: Object,
    default: () => ({}),
  },
  // 禁用的日期
  disabledTime: {
    type: Function,
    default: () => {
      return false;
    },
  },
};
