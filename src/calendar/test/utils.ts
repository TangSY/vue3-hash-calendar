import { fillNumber } from '../utils';

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
