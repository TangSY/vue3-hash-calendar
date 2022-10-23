import _Calendar from './Calendar';
import { withInstall } from './utils';
import './index.less';

export const Calendar = withInstall(_Calendar);
export default Calendar;
export { calendarProps } from './Calendar';
export type { CalendarPropsType } from './Calendar';
export type {
  CalendarDateType,
  CalendarPanelType,
  CalendarExposeType,
} from './types';

declare module 'vue' {
  export interface GlobalComponents {
    VueHashCalendar: typeof Calendar;
  }
}
