export type ThemeColorType = {
  'main-color': string;
  'bg-color': string;
  'main-font-color': string;
  'vice-font-color': string;
  'disabled-bg-color': string;
  'disabled-font-color': string;
};

export type PickerType = 'datetime' | 'date' | 'time';

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
