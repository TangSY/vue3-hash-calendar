import { getMaxDate, getMinDate } from '.';

/**
 * 判断安卓与IOS平台
 * @returns {string}
 */
export const checkPlatform = function () {
  if (/android/i.test(navigator.userAgent)) {
    return '1';
  }
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    return '2';
  }
};

/**
 * 当前日期是否在两个日期范围之间
 * @param {*} curr
 * @param {*} min
 * @param {*} max
 * @returns
 */
export const isDateInRange = (curr: Date, min: Date, max: Date) => {
  const minDate = getMinDate(min);
  const maxDate = getMaxDate(max);
  const currentDate = new Date(curr.setHours(0, 0, 0, 0)).getTime();

  if (minDate && maxDate) return currentDate > minDate && currentDate < maxDate;
  if (minDate) return currentDate > minDate;
  if (maxDate) return currentDate < maxDate;

  return true;
};

export const isWindow = (val: any) => val === window;

export const isDate = (val: unknown): val is Date =>
  Object.prototype.toString.call(val) === '[object Date]' &&
  !Number.isNaN((val as Date).getTime());

// 判断是否为闰年
export const isLeap = (year: number) =>
  year % 4 === 0 ? (year % 100 !== 0 ? 1 : year % 400 === 0 ? 1 : 0) : 0;
