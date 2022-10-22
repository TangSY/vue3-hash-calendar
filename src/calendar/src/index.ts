export const DatetimePickerProps = {
  // 主题颜色
  themeColor: {
    type: Object,
    default: () => {},
  },
  // 是否支持点击日期区域快速切换年份
  changeYearFast: {
    type: Boolean,
    default: false,
  },
  // 是否显示 周月视图切换指示箭头，model 等于 inline 时生效
  isShowArrow: {
    type: Boolean,
    default: false,
  },
  // 是否展示周视图
  isShowWeekView: {
    type: Boolean,
    default: false,
  },
  // 是否显示日历组件
  visible: {
    type: Boolean,
    default: false,
  },
  // 是否显示日历组件操作栏
  isShowAction: {
    type: Boolean,
    default: true,
  },
  pickerType: {
    // 选择器类型 datetime：日期+时间   date：日期   time：时间
    type: String,
    default: "datetime",
  },
  showTodayButton: {
    // 是否显示返回今日按钮
    type: Boolean,
    default: true,
  },
  defaultDatetime: {
    // 默认时间
    type: Date,
    default() {
      return new Date();
    },
  },
  format: null, // 确认选择之后，返回的日期格式
  model: {
    type: String,
    default: "inline",
  },
  // 日期下面的标记
  markDate: {
    type: Array,
    default: () => [],
  },
  // 禁用的日期
  disabledDate: {
    type: Function,
    default: () => {
      return false;
    },
  },
  // 使用的语言包
  lang: {
    type: String,
    default: "CN",
  },
};
