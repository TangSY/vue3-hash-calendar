import { ExtractPropTypes, PropType } from 'vue';
import { CalendarDateType, DisabledScrollType } from './types';
import { makeArrayProp } from './utils';

export const calendarScrollContainerProps = {
  disabledScroll: {
    type: [Boolean, String] as PropType<DisabledScrollType>,
    default: () => false,
  },
  calendarData: makeArrayProp<CalendarDateType>(),
};

export type CalendarScrollContainerPropsType = ExtractPropTypes<
  typeof calendarScrollContainerProps
>;
