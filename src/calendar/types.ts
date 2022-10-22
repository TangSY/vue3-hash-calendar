export type ThemeColorType = {
  'main-color': string;
  'bg-color': string;
  'main-font-color': string;
  'vice-font-color': string;
  'disabled-bg-color': string;
  'disabled-font-color': string;
};

export type PickerType = 'datetime' | 'date' | 'time';

export type CalendarPanelType = 'date' | 'month' | 'year' | 'yearRange';

export type ModelType = 'dialog' | 'inline';

export type LangType = 'EN' | 'CN';

export type MarkType = 'dot' | 'circle' | 'dot+circle';

export type MarkDateType =
  | { date: string[]; type?: MarkType; color: string }
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

export type CalendarDateType = {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
};

export type EmitDateType = Date | string;

export type CanlendarExposeType = {
  today: () => void;
  lastMonth: () => void;
  nextMonth: () => void;
  lastWeek: () => void;
  nextWeek: () => void;
};
