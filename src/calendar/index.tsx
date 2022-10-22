import { defineComponent, type ExtractPropTypes, type PropType } from 'vue';

// Types
import type {
  DisabledScrollType,
  LangType,
  MarkDateType,
  MarkType,
  ModelType,
  PickerType,
  ThemeColorType,
  WeekStartType,
} from './types';

// Utils
import {
  isDate,
  makeArrayProp,
  makeNumberProp,
  makeStringProp,
  truthProp,
  unknownProp,
} from './utils';

export const calendarProps = {
  themeColor: {
    type: Object as PropType<ThemeColorType>,
    default: () => {},
  },
  changeYearFast: Boolean,
  isShowArrow: Boolean,
  isShowWeekView: Boolean,
  visible: Boolean,
  isShowAction: truthProp,
  pickerType: makeStringProp<PickerType>('datetime'),
  showTodayButton: truthProp,
  defaultDatetime: {
    type: Date,
    validator: isDate,
    default: () => new Date(),
  },
  minDate: {
    type: Date,
    validator: isDate,
    default: null,
  },
  maxDate: {
    type: Date,
    validator: isDate,
    default: null,
  },
  format: unknownProp,
  model: makeStringProp<ModelType>('inline'),
  markType: makeStringProp<MarkType>('dot'),
  markDate: makeArrayProp<MarkDateType>(),
  disabledDate: {
    type: Function,
    default: () => false,
  },
  lang: makeStringProp<LangType>('CN'),
  scrollChangeDate: truthProp,
  calendarTitleHeight: makeNumberProp(0),
  minuteStep: makeNumberProp(1),
  weekStart: makeStringProp<WeekStartType>('Sunday'),
  disabledScroll: {
    type: [Boolean, String] as PropType<DisabledScrollType>,
    default: () => false,
  },
  isShowNotCurrentMonthDay: truthProp,
  firstDayOfMonthClassName: makeStringProp<string>(''),
  todayClassName: makeStringProp<string>(''),
  checkedDayClassName: makeStringProp<string>(''),
  notCurrentMonthDayClassName: makeStringProp<string>(''),
  disabledClassName: makeStringProp<string>(''),
};

export type CalendarProps = ExtractPropTypes<typeof calendarProps>;

export default defineComponent({
  name: 'VueHashCalendar',

  props: calendarProps,

  emits: [
    'update:visible',
    'update:isShowWeekView',
    'calendarTypeChange',
    'click',
    'confirm',
    'change',
    'slidechange',
    'touchstart',
    'touchmove',
    'touchend',
  ],

  setup(props, { emit, slots }) {
    return () => <div>123</div>;
  },
});
