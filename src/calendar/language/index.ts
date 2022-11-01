/**
 * @Description:    统一导出所有语言文件
 * @Author:         TSY
 * @CreateDate:     2020/3/22 22:01
 */

import CN from './cn';
import EN from './en';

export type LanguageEntityType = {
  CONFIRM: string;
  TODAY: string;
  WEEK: string[];
  MONTH: string[];
  DEFAULT_DATE_FORMAT: string;
  DEFAULT_TIME_FORMAT: string;
};

export const LanguageTypes = ['CN', 'EN'] as const;

export type LanguageType = typeof LanguageTypes[number];

export default {
  CN,
  EN,
};
