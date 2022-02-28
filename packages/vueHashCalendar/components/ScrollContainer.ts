export const ScrollContainerProps = {
  // 禁止滑动，可选值【left, right, up, down, horizontal, vertical, true, false】
  disabledScroll: {
    type: [Boolean, String],
    default: false,
  },
  // 日历数据
  calendarData: {
    type: Array,
    default: () => [],
  },
};
