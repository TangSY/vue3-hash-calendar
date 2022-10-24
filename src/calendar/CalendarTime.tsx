import { ExtractPropTypes, PropType } from 'vue';
import { CalendarDateType } from './types';
import { makeDateProp, makeNumberProp } from './utils';

export const calendarTimeProps = {
  show: Boolean,
  defaultTime: makeDateProp(new Date()),
  disabledTime: {
    type: Function,
    default: () => false,
  },
  minuteStep: makeNumberProp(1),
  calendarDate: {
    type: Object as PropType<CalendarDateType>,
    default: () => ({}),
  },
};

export type CalendarTimePropsType = ExtractPropTypes<typeof calendarTimeProps>;
