import { ComponentPublicInstance } from 'vue';
import { CalendarPropsType } from './Calendar';
import { CalendarDatePropsType } from './CalendarDate';
import { CalendarTimePropsType } from './CalendarTime';

export type ThemeColorType = {
  'main-color': string;
  'bg-color': string;
  'main-font-color': string;
  'vice-font-color': string;
  'disabled-bg-color': string;
  'disabled-font-color': string;
};

export type PickerType = 'datetime' | 'date' | 'time';

export type SelectType = 'single' | 'multiple' | 'range';

export type CalendarPanelType = 'date' | 'month' | 'year' | 'yearRange';

export type ModelType = 'dialog' | 'inline';

export type LangType = 'EN' | 'CN';

export type MarkType = 'dot' | 'circle' | 'dot+circle';

export type MarkDateType =
  | {
      date: string[];
      type?: MarkType;
      color: string;
    }
  | string;

export type WeekStartType =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export type DisabledScrollType =
  | boolean
  | 'left'
  | 'right'
  | 'up'
  | 'down'
  | 'horizontal'
  | 'vertical';

export type ScrollDirectionType = 'left' | 'right' | 'up' | 'down';

export type CalendarDayType =
  | 'single'
  | 'start'
  | 'middle'
  | 'end'
  | 'start-end'
  | 'multiple';

export type CalendarDateType = {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  type?: CalendarDayType;
};

export type CalendarMonthType = Pick<
  CalendarDateType,
  'day' | 'month' | 'year' | 'type'
>;

export type CalendarYearMonthType = {
  year: number;
  month: number;
};

export type EmitDateType = Date | string;

export type CalendarExposeType = {
  today: () => void;
  reset: (date: Date) => void;
  lastMonth: () => void;
  nextMonth: () => void;
  lastWeek: () => void;
  nextWeek: () => void;
};

export type CalendarDateExposeType = {
  today: () => void;
  getLastMonth: () => void;
  getNextMonth: () => void;
  changeWeekView: (options: { isNext: boolean }) => void;
};

export type CalendarInstance = ComponentPublicInstance<
  CalendarPropsType,
  CalendarExposeType
>;

export type CalendarDateInstance = ComponentPublicInstance<
  CalendarDatePropsType,
  CalendarDateExposeType
>;

export type CalendarTimeInstance =
  ComponentPublicInstance<CalendarTimePropsType>;
