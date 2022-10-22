import { ExtractPropTypes } from "vue";

export const scrollContainerProps = {
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

export type ButtonGroupProps = ExtractPropTypes<typeof scrollContainerProps>;

export type ScorllDireType = "up" | "down" | "left" | "right";
