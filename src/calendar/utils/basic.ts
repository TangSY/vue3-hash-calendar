import { isLeap } from '.';

/**
 * 日期格式化
 * @param time
 * @param format
 * @returns {string}
 */
export const formatDate = function (
  time: Date | string,
  format: string,
  lang = 'CN'
) {
  lang = lang.toUpperCase();
  const models = import.meta.globEager('../language/index.ts');
  const model = models[Object.keys(models)[0]];
  const language = model.default[lang] || {};
  format =
    format || `${language.DEFAULT_DATE_FORMAT} ${language.DEFAULT_TIME_FORMAT}`;
  const date = time ? new Date(time) : new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月份是从0开始的
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const preArr = Array.apply(null, Array(10)).map(function (elem, index) {
    return '0' + index;
  }); /// /开个长度为10的数组 格式为 00 01 02 03

  const newTime = format
    .replace(/YY/g, year)
    .replace(/F/g, hour >= 12 ? 'pm' : 'am')
    .replace(/ss/g, preArr[sec] || sec)
    .replace(/mm/g, preArr[min] || min)
    .replace(
      /hh/g,
      hour > 12 && format.includes('F')
        ? hour - 12
        : format.includes('F')
        ? hour
        : preArr[hour] || hour
    )
    .replace(/DD/g, preArr[day] || day)
    .replace(
      /MM/g,
      lang === 'EN' ? language.MONTH[month - 1] : preArr[month] || month
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
