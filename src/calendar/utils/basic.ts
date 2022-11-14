import { isLeap } from '.';
import language from '../language';
import { LangType } from '../types';

/**
 * 日期格式化
 * @param time
 * @param format
 * @returns {string}
 */
export const formatDate = function (
  time: Date | string,
  format: string,
  lang: LangType = 'CN'
) {
  const languageEntiy = language[lang] || {};
  format =
    format ||
    `${languageEntiy.DEFAULT_DATE_FORMAT} ${languageEntiy.DEFAULT_TIME_FORMAT}`;
  const date = time ? new Date(time) : new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月份是从0开始的
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  // eslint-disable-next-line prefer-spread
  const preArr = Array.apply(null, Array(10)).map((elem, index) => '0' + index); /// /开个长度为10的数组 格式为 00 01 02 03

  const newTime = format
    .replace(/YY/g, year + '')
    .replace(/F/g, hour >= 12 ? 'pm' : 'am')
    .replace(/ss/g, preArr[sec] || sec + '')
    .replace(/mm/g, preArr[min] || min + '')
    .replace(
      /hh/g,
      hour > 12 && format.includes('F')
        ? hour - 12 + ''
        : format.includes('F')
        ? hour + ''
        : preArr[hour] || hour + ''
    )
    .replace(/DD/g, preArr[day] || day + '')
    .replace(
      /MM/g,
      lang === 'EN'
        ? languageEntiy.MONTH[month - 1]
        : preArr[month] || month + ''
    );

  return newTime;
};

// 小于10，在前面补0
export const fillNumber = (val: number) => (val > 9 ? val : '0' + val);

export const daysOfMonth = (year: number) => [
  31,
  28 + isLeap(year),
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];

// 获取月份某一天是星期几
export const getDayOfWeek = (
  year = new Date().getFullYear(),
  month = new Date().getMonth(),
  day = 1
) => {
  const dayOfMonth = new Date(year, month, day); // 获取当月的第day天
  const dayOfWeek = dayOfMonth.getDay(); // 判断第day天是星期几(返回[0-6]中的一个，0代表星期天，1代表星期一)
  return dayOfWeek;
};

export type Writeable<T> = { -readonly [P in keyof T]: T[P] };

export function pick<T, U extends keyof T>(
  obj: T,
  keys: ReadonlyArray<U>,
  ignoreUndefined?: boolean
) {
  return keys.reduce((ret, key) => {
    if (!ignoreUndefined || obj[key] !== undefined) {
      ret[key] = obj[key];
    }
    return ret;
  }, {} as Writeable<Pick<T, U>>);
}

export const getMinDate = (min: Date) =>
  min && new Date(min.setHours(0, 0, 0, 0)).getTime() - 24 * 60 * 60 * 1000;

export const getMaxDate = (max: Date) =>
  max && new Date(max.setHours(0, 0, 0, 0)).getTime() + 24 * 60 * 60 * 1000;

export function compareMonth(date1: Date, date2: Date) {
  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();

  if (year1 === year2) {
    const month1 = date1.getMonth();
    const month2 = date2.getMonth();
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }

  return year1 > year2 ? 1 : -1;
}

export function compareDay(day1: Date, day2: Date) {
  const compareMonthResult = compareMonth(day1, day2);

  if (compareMonthResult === 0) {
    const date1 = day1.getDate();
    const date2 = day2.getDate();
    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }

  return compareMonthResult;
}

export const cloneDate = (date: Date) => new Date(date);

export const cloneDates = (dates: Date | Date[]) =>
  Array.isArray(dates) ? dates.map(cloneDate) : cloneDate(dates);

export function getDayByOffset(date: Date, offset: number) {
  const cloned = cloneDate(date);
  cloned.setDate(cloned.getDate() + offset);
  return cloned;
}

export const getPrevDay = (date: Date) => {
  if (!date) return date;

  return getDayByOffset(date, -1);
};
export const getNextDay = (date: Date) => {
  if (!date) return date;

  return getDayByOffset(date, 1);
};
export const getToday = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export function calcDateNum(date: [Date, Date]) {
  const day1 = date[0].getTime();
  const day2 = date[1].getTime();
  return (day2 - day1) / (1000 * 60 * 60 * 24) + 1;
}
