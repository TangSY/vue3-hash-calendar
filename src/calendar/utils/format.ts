/**
 * 日期格式化
 * @param time
 * @param format
 * @returns {string}
 */
export const formatDate = function (time: string, format: string, lang = 'CN') {
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
