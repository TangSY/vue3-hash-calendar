import { fillNumber } from '../utils';

export const ON_CHANGE_BASIC_CALLED_TIMES = 2;
export const now = new Date(new Date().setHours(0, 0, 0, 0));
export const nowDateText = `${new Date().getFullYear()}年${fillNumber(
  new Date().getMonth() + 1
)}月${fillNumber(new Date().getDate())}日`;
export const nowMonthText = `${fillNumber(new Date().getMonth() + 1)}月`;
export const nowDayText =
  new Date().getDate() === 1 ? nowMonthText : new Date().getDate() + '';
export const defaultDate = new Date(2022, 0, 1, 1, 1);
export const defalutDateText = '2022年01月01日';
export const defalutMonthText = '1月';
export const defalutDayText = '1月';
export const defalutTimeText = '01:01';

export const minDate = new Date(2022, 0, 1, 1, 1);
export const maxDate = new Date(2022, 1, 1, 1, 1);

export const defaultYearMonth = { year: 2022, month: 0 };
export const defaultRangeDate = [new Date(2022, 0, 1), new Date(2022, 0, 5)];
export const defaultMultipleDate = [
  new Date(2022, 0, 1),
  new Date(2022, 0, 5),
  new Date(2022, 0, 10),
];
