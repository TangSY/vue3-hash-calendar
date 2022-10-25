import {
  computed,
  defineComponent,
  ExtractPropTypes,
  ref,
  watch,
  type PropType,
} from 'vue';
import { ScorllDireType } from './components/scroll-container';
import languageUtil, { LanguageEntityType, LanguageType } from './language';
import type { CalendarDateType, DisabledScrollType, LangType } from './types';
import {
  isDateInRange,
  makeDateProp,
  makeNumberProp,
  makeStringProp,
  truthProp,
} from './utils';

export const calendarYearMonthProps = {
  minDate: makeDateProp(null),
  maxDate: makeDateProp(null),
  disabledDate: {
    type: Function,
    default: () => false,
  },
  scrollChangeDate: truthProp,
  checkedDayClassName: makeStringProp<string>(''),
  notCurrentMonthDayClassName: makeStringProp<string>(''),
  disabledClassName: makeStringProp<string>(''),
  type: String,
  calendarTitleHeight: makeNumberProp(0),
  calendarContentHeight: makeNumberProp(0),
  disabledScroll: {
    type: [Boolean, String] as PropType<DisabledScrollType>,
    default: () => false,
  },
  calendarDate: {
    type: Object as PropType<CalendarDateType>,
    default: () => ({}),
  },
  lang: makeStringProp<LangType>('CN'),
};

export type CalendarYearMonthPropsType = ExtractPropTypes<
  typeof calendarYearMonthProps
>;

type YearRangeType = { s: number; e: number };

export default defineComponent({
  name: 'CalendarYearMonth',

  props: calendarYearMonthProps,

  emits: ['click', 'slidechange', 'touchstart', 'touchmove', 'touchend'],

  setup(props, { emit }) {
    const language = ref({} as LanguageEntityType);
    const yearRange = ref(10);
    const disabledScrollDirec = ref<DisabledScrollType>(false);
    const yearMonthShow = ref<(number | string | YearRangeType)[][]>([]);

    const lang = props.lang.toUpperCase() as LanguageType;
    language.value = languageUtil[lang];

    const itemHeight = computed(
      () => (props.calendarContentHeight - props.calendarTitleHeight) / 4
    );

    const initYear = (year: number) => {
      const yearArr = [];
      const currYear = `${year || props.calendarDate.year}`;
      const yearStart = parseInt(currYear.substring(0, 3) + '0', 10);
      for (let i = 0; i <= yearRange.value; i++) {
        yearArr.push(yearStart + i);
      }
      yearArr.unshift(yearStart - 1);

      return yearArr;
    };

    const initYearRange = (year: number) => {
      const yearRangeArr = [];
      const currYear = `${year || props.calendarDate.year}`;
      const yearStart = parseInt(currYear.substring(0, 2) + '00', 10);
      for (let i = 0; i <= yearRange.value; i++) {
        yearRangeArr.push({ s: yearStart + i * 10, e: yearStart + i * 10 + 9 });
      }
      yearRangeArr.unshift({ s: yearStart - 10, e: yearStart - 1 });

      return yearRangeArr;
    };

    const getThreeYearArr = (year = props.calendarDate.year) => {
      const yearStr = year + '';
      const yearStart = yearStr.substring(0, 3);
      const yearStartLast = parseInt(parseInt(yearStart, 10) - 1 + '0', 10);
      const yearStartCurr = parseInt(yearStart + '0', 10);
      const yearStartNext = parseInt(parseInt(yearStart, 10) + 1 + '0', 10);

      return [
        initYear(yearStartLast),
        initYear(yearStartCurr),
        initYear(yearStartNext),
      ];
    };

    const getThreeYearRangeArr = (year = props.calendarDate.year) => {
      const yearStr = year + '';
      const yearStart = yearStr.substring(0, 2);
      const yearStartLast = parseInt(parseInt(yearStart, 10) - 1 + '00', 10);
      const yearStartCurr = parseInt(yearStart + '00', 10);
      const yearStartNext = parseInt(parseInt(yearStart, 10) + 1 + '00', 10);

      return [
        initYearRange(yearStartLast),
        initYearRange(yearStartCurr),
        initYearRange(yearStartNext),
      ];
    };

    const getNextOpitonData = () => {
      if (props.type === 'year') {
        const year = yearMonthShow.value[2][1] as number;
        yearMonthShow.value = getThreeYearArr(year);
      } else if (props.type === 'yearRange') {
        const value = yearMonthShow.value[2][1] as YearRangeType;
        const year = value.s;
        yearMonthShow.value = getThreeYearRangeArr(year);
      }
    };

    const getLastOptionData = () => {
      if (props.type === 'year') {
        const year = yearMonthShow.value[0][1] as number;
        yearMonthShow.value = getThreeYearArr(year);
      } else if (props.type === 'yearRange') {
        const value = yearMonthShow.value[0][1] as YearRangeType;
        const year = value.s;
        yearMonthShow.value = getThreeYearRangeArr(year);
      }
    };

    const slideChange = (direc: ScorllDireType) => {
      if (direc === 'left') {
        getNextOpitonData();
      } else if (direc === 'right') {
        getLastOptionData();
      }

      emit('slidechange', direc);
    };

    const getRangeYear = (date: YearRangeType) => {
      const yearStart = date.s;
      const yearEnd = date.e;
      const yearArr = [];

      for (let i = yearStart; i <= yearEnd; i++) {
        yearArr.push(i);
      }

      return yearArr;
    };

    const isDisabled = (date: YearRangeType & number, index: number) => {
      let fDate = new Date();

      if (props.type === 'month') {
        fDate = new Date(
          `${props.calendarDate.year}/${index + 1}/${props.calendarDate.day}`
        );
      } else if (props.type === 'year') {
        fDate = new Date(
          `${date}/${props.calendarDate.month + 1}/${props.calendarDate.day}`
        );
      } else if (props.type === 'yearRange') {
        const yearArr = getRangeYear(date);
        return yearArr.every((year) => {
          fDate = new Date(
            `${year}/${props.calendarDate.month + 1}/${props.calendarDate.day}`
          );
          return (
            props.disabledDate(fDate) ||
            !isDateInRange(fDate, props.minDate, props.maxDate)
          );
        });
      }

      return (
        props.disabledDate(fDate) ||
        !isDateInRange(fDate, props.minDate, props.maxDate)
      );
    };

    const dateClick = (date: YearRangeType & number, index: number) => {
      if (!date) return; // fix:1月无法选中
      if (isDisabled(date, index)) return;

      let checkedDate = { ...props.calendarDate, type: props.type };
      if (props.type === 'month') {
        checkedDate = {
          ...checkedDate,
          month: index,
        };
      }
      if (props.type === 'year') {
        checkedDate = {
          ...checkedDate,
          year: date,
        };
      }
      if (props.type === 'yearRange') {
        const yearArr = getRangeYear(date);
        checkedDate = {
          ...checkedDate,
          year: yearArr.includes(checkedDate.year) ? checkedDate.year : date.s,
        };
      }

      emit('click', checkedDate);
    };

    const isChecked = (date: YearRangeType & number, index: number) => {
      if (props.type === 'month') {
        return index === props.calendarDate.month;
      }
      if (props.type === 'year') {
        return date === props.calendarDate.year;
      }
      if (props.type === 'yearRange') {
        return (
          date.s <= props.calendarDate.year && date.e >= props.calendarDate.year
        );
      }
    };

    const isNotCurrent = (index: number) =>
      (index === 0 || index === 11) &&
      (props.type === 'year' || props.type === 'yearRange');

    // 监听手指开始滑动事件
    const touchStart = (event: TouchEvent) => {
      emit('touchstart', event);
    };

    // 监听手指开始滑动事件
    const touchMove = (event: TouchEvent) => {
      emit('touchmove', event);
    };

    // 监听手指开始滑动事件
    const touchEnd = (event: TouchEvent) => {
      emit('touchend', event);
    };

    watch(
      () => props.type,
      (val) => {
        disabledScrollDirec.value = props.disabledScroll;
        if (val === 'month') {
          disabledScrollDirec.value = true;
          yearMonthShow.value = [
            language.value.MONTH,
            language.value.MONTH,
            language.value.MONTH,
          ];
        } else if (val === 'year') {
          yearMonthShow.value = getThreeYearArr();
        } else if (val === 'yearRange') {
          yearMonthShow.value = getThreeYearRangeArr();
        }
      }
    );
  },
});
