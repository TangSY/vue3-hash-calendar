import { ExtractPropTypes, type PropType } from 'vue';
import type { CalendarDateType, DisabledScrollType, LangType } from './types';
import {
  makeDateProp,
  makeNumberProp,
  makeStringProp,
  truthProp,
} from './utils';

export const yearMonthPickerProps = {
  minDate: makeDateProp(null),
  maxDate: makeDateProp(null),
  disabledDate: {
    type: Function,
    default: () => false,
  },
  scrollChangeDate: truthProp,
  checkedDayClassName: makeStringProp<string>(''),
  notCurrentMonthDayClassName: makeStringProp<string>(''),
  disabledClassName: makeStringProp<string>(''),
  type: String,
  calendarTitleHeight: makeNumberProp(0),
  calendarContentHeight: makeNumberProp(0),
  disabledScroll: {
    type: [Boolean, String] as PropType<DisabledScrollType>,
    default: () => false,
  },
  calendarDate: {
    type: Object as PropType<CalendarDateType>,
    default: () => ({}),
  },
  lang: makeStringProp<LangType>('CN'),
};

export type YearMonthPickerPropsType = ExtractPropTypes<
  typeof yearMonthPickerProps
>;
