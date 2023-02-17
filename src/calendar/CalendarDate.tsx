import {
  reactive,
  defineComponent,
  ref,
  type ExtractPropTypes,
  type PropType,
  computed,
  nextTick,
  watch,
} from 'vue';
import languageUtil from './language';
import { useExpose, useMountedOrActivated, useRect } from './hooks';
import {
  CalendarDateExposeType,
  CalendarMonthType,
  CalendarYearMonthType,
  DisabledScrollType,
  LangType,
  MarkDateType,
  MarkType,
  ScrollDirectionType,
  SelectType,
  WeekStartType,
} from './types';
import {
  calcMiddleDay,
  compareDay,
  daysOfMonth,
  fillNumber,
  formatDate,
  getDayOfWeek,
  getMaxDate,
  getMinDate,
  getStartEndDay,
  isDateInRange,
  makeArrayProp,
  makeDateProp,
  makeNumberProp,
  makeStringProp,
  transDateToYearMonthDay,
  truthProp,
} from './utils';

export const calendarDateProps = {
  showWeekView: Boolean,
  show: Boolean,
  disabledWeekView: Boolean,
  selectType: makeStringProp<SelectType>('single'),
  allowSameDay: Boolean,
  defaultDate: [Date, Array] as PropType<Date | Date[] | null>,
  defaultYearMonth: {
    type: Object as PropType<CalendarYearMonthType>,
    default: {},
  },
  minDate: makeDateProp(null),
  maxDate: makeDateProp(null),
  maxRange: makeNumberProp(0),
  markType: makeStringProp<MarkType>('dot'),
  markDate: makeArrayProp<MarkDateType>(),
  disabledDate: {
    type: Function,
    default: () => false,
  },
  lang: makeStringProp<LangType>('CN'),
  scrollChangeDate: truthProp,
  weekStart: makeStringProp<WeekStartType>('Sunday'),
  disabledScroll: {
    type: [Boolean, String] as PropType<DisabledScrollType>,
    default: () => false,
  },
  showNotCurrentMonthDay: truthProp,
  firstDayOfMonthClassName: makeStringProp<string>(''),
  todayClassName: makeStringProp<string>(''),
  checkedDayClassName: makeStringProp<string>(''),
  notCurrentMonthDayClassName: makeStringProp<string>(''),
  disabledClassName: makeStringProp<string>(''),
};

export type CalendarDatePropsType = ExtractPropTypes<typeof calendarDateProps>;

export default defineComponent({
  name: 'CalendarDate',

  props: calendarDateProps,

  emits: [
    'height',
    'update:showWeekView',
    'click',
    'change',
    'overRange',
    'yearMonthChange',
    'slidechange',
    'touchstart',
    'touchmove',
    'touchend',
  ],

  setup(props, { emit, slots }) {
    type TimerType = ReturnType<typeof setTimeout> | null;
    let timer: TimerType;
    const weekTitleRef = ref(null);
    const calendarRef = ref(null);
    const calendarItemRef = reactive<HTMLElement[]>([]);
    const yearOfToday = ref(new Date().getFullYear());
    const monthOfToday = ref(new Date().getMonth());
    const dayOfToday = ref(new Date().getDate());
    const weekArray = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    const calendarWeek = ref(['日', '一', '二', '三', '四', '五', '六']);
    const calendarOfMonth = ref<CalendarMonthType[][]>([]);
    const calendarOfMonthShow = ref<CalendarMonthType[][]>([]);
    const calendarDaysTotalLength = ref(42);
    const lastMonthYear = ref<number>(0);
    const lastMonth = ref<number>(0);
    const nextMonthYear = ref<number>(0);
    const nextMonth = ref<number>(0);
    const checkedDate = ref<CalendarMonthType[]>([]);
    const weekStartIndex = ref(0);
    const translateIndex = ref(0);
    const transitionDuration = ref(0.3);
    const touch = ref({
      x: 0,
      y: 0,
    });
    const isTouching = ref(false);
    const calendarGroupHeight = ref(0);
    const calendarWeekTitleHeight = ref(0);
    const calendarItemHeight = ref(0);
    const touchStartPositionX = ref(0);
    const touchStartPositionY = ref(0);
    const calendarY = ref(0);
    const selectedDayIndex = ref(0);
    const lastWeek = ref<CalendarMonthType[]>([]);
    const nextWeek = ref<CalendarMonthType[]>([]);
    const isLastWeekInCurrentMonth = ref(false);
    const isNextWeekInCurrentMonth = ref(false);
    const markDateColorObj = ref<any>({});
    const markDateTypeObj = ref<any>({});
    const currentYearMonth = ref<CalendarYearMonthType>({
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    });

    calendarWeek.value = languageUtil[props.lang].WEEK;
    weekStartIndex.value = weekArray.indexOf(props.weekStart.toLowerCase());
    calendarWeek.value = [
      ...calendarWeek.value.slice(
        weekStartIndex.value,
        calendarWeek.value.length
      ),
      ...calendarWeek.value.slice(0, weekStartIndex.value),
    ];

    const isShowWeek = computed({
      get() {
        return props.showWeekView;
      },
      set(val) {
        emit('update:showWeekView', val);
      },
    });

    // 日历以星期方式展示
    const showWeek = (checkedDatetime?: CalendarMonthType) => {
      if (!checkedDatetime) {
        checkedDatetime = checkedDate.value[0];
      }
      const { month, day } = checkedDatetime;
      const daysArr: number[] = [];
      calendarOfMonth.value[1].forEach((item) => {
        daysArr.push(item.day);
      });
      let dayIndexOfMonth = daysArr.indexOf(day);
      // 当day为月底的天数时，有可能在daysArr的前面也存在上一个月对应的日期，所以需要取lastIndexOf
      if (day > 15) {
        dayIndexOfMonth = daysArr.lastIndexOf(day);
      }

      // 计算当前日期在第几行
      const indexOfLine = Math.ceil((dayIndexOfMonth + 1) / 7);
      const lastLine = indexOfLine - 1;
      calendarY.value = -(calendarItemHeight.value * lastLine);

      isShowWeek.value = true;
      calendarGroupHeight.value = calendarItemHeight.value;

      let currentWeek: CalendarMonthType[] = [];
      const sliceStart = lastLine * 7;
      const sliceEnd = sliceStart + 7;
      isLastWeekInCurrentMonth.value = false;
      currentWeek = calendarOfMonth.value[1].slice(sliceStart, sliceEnd);
      currentWeek.forEach((item, index) => {
        if (item.day === day) {
          selectedDayIndex.value = index;
        }
      });

      const firstDayOfCurrentWeek = currentWeek[0];
      const lastDayOfCurrentWeek = currentWeek[6];

      if (
        firstDayOfCurrentWeek.month !== month ||
        firstDayOfCurrentWeek.day === 1
      ) {
        if (calendarOfMonth.value[0].slice(28, 35)[6].month !== month) {
          lastWeek.value = calendarOfMonth.value[0].slice(28, 35);
        } else {
          lastWeek.value = calendarOfMonth.value[0].slice(21, 28);
        }
      } else {
        lastWeek.value = calendarOfMonth.value[1].slice(
          sliceStart - 7,
          sliceEnd - 7
        );
        if (
          lastWeek.value[selectedDayIndex.value] &&
          lastWeek.value[selectedDayIndex.value].month === month
        ) {
          isLastWeekInCurrentMonth.value = true;
        }
      }

      isNextWeekInCurrentMonth.value = false;
      if (
        lastDayOfCurrentWeek.day < firstDayOfCurrentWeek.day &&
        lastDayOfCurrentWeek.month !== month
      ) {
        nextWeek.value = calendarOfMonth.value[2].slice(7, 14);
      } else if (
        lastDayOfCurrentWeek.day ===
        daysOfMonth(lastDayOfCurrentWeek.year)[lastDayOfCurrentWeek.month]
      ) {
        nextWeek.value = calendarOfMonth.value[2].slice(0, 7);
      } else {
        nextWeek.value = calendarOfMonth.value[1].slice(
          sliceStart + 7,
          sliceEnd + 7
        );
        if (nextWeek.value[selectedDayIndex.value].month === month) {
          isNextWeekInCurrentMonth.value = true;
        }
      }
      calendarOfMonthShow.value[0].splice(sliceStart, 7, ...lastWeek.value);
      calendarOfMonthShow.value[2].splice(sliceStart, 7, ...nextWeek.value);
    };

    // 非本月日期
    const isNotCurrentMonthDay = (date: CalendarMonthType, index: number) => {
      const dateOfCurrentShow = calendarOfMonth.value[index][15]; // 本月中间的日期一定为本月
      return (
        date.year !== dateOfCurrentShow.year ||
        date.month !== dateOfCurrentShow.month
      );
    };

    // 是否为当前月的第一天
    const isFirstDayOfMonth = (date: CalendarMonthType, i: number) =>
      date.day === 1 && !isNotCurrentMonthDay(date, i);

    const formatDisabledDate = (date: CalendarMonthType) => {
      if (!date.day) return;

      const fDate = new Date(`${date.year}/${date.month + 1}/${date.day}`);

      return (
        props.disabledDate(fDate) ||
        !isDateInRange(fDate, props.minDate, props.maxDate)
      );
    };

    // 计算每个月的日历
    const calculateCalendarOfMonth = (
      year = new Date().getFullYear(),
      month = new Date().getMonth()
    ) => {
      const calendarOfCurrentMonth = [];

      const lastMonthYear = month === 0 ? year - 1 : year; // 上个月的年份
      const lastMonth = month === 0 ? 11 : month - 1; // 上个月的月份
      const nextMonthYear = month === 11 ? year + 1 : year; // 下个月的年份
      const nextMonth = month === 11 ? 0 : month + 1; // 下个月的月份

      // 如果当月第一天不是指定的开始星期名称，则在前面补齐上个月的日期
      let dayOfWeek = getDayOfWeek(year, month);
      const lastMonthDays = daysOfMonth(year)[lastMonth]; // 上个月的总天数
      if (dayOfWeek < weekStartIndex.value) {
        dayOfWeek = 7 - weekStartIndex.value + dayOfWeek;
      } else {
        dayOfWeek -= weekStartIndex.value;
      }
      for (let i = 0; i < dayOfWeek; i++) {
        calendarOfCurrentMonth.push({
          year: lastMonthYear,
          month: lastMonth,
          day: props.showNotCurrentMonthDay
            ? lastMonthDays - (dayOfWeek - 1 - i)
            : 0,
        });
      }

      // 当月日期
      for (let i = 0; i < daysOfMonth(year)[month]; i++) {
        calendarOfCurrentMonth.push({
          year,
          month,
          day: i + 1,
        });
      }

      // 在日历后面填充下个月的日期，补齐6行7列
      const fillDays =
        calendarDaysTotalLength.value - calendarOfCurrentMonth.length;
      for (let i = 0; i < fillDays; i++) {
        calendarOfCurrentMonth.push({
          year: nextMonthYear,
          month: nextMonth,
          day: props.showNotCurrentMonthDay ? i + 1 : 0,
        });
      }

      return calendarOfCurrentMonth;
    };

    // 计算当前展示月份的前后月份日历信息 flag  -1:获取上个月日历信息   0:当月信息或者跨月展示日历信息  1:获取下个月日历信息
    const calculateCalendarOfThreeMonth = (
      year = currentYearMonth.value.year,
      month = currentYearMonth.value.month
    ) => {
      lastMonthYear.value = month === 0 ? year - 1 : year; // 上个月的年份
      lastMonth.value = month === 0 ? 11 : month - 1; // 上个月的月份
      nextMonthYear.value = month === 11 ? year + 1 : year; // 下个月的年份
      nextMonth.value = month === 11 ? 0 : month + 1; // 下个月的月份

      const firstMonth = calculateCalendarOfMonth(
        lastMonthYear.value,
        lastMonth.value
      );
      const secondMonth = calculateCalendarOfMonth(year, month);
      const thirdMonth = calculateCalendarOfMonth(
        nextMonthYear.value,
        nextMonth.value
      );

      calendarOfMonth.value = [];
      calendarOfMonth.value.push(firstMonth, secondMonth, thirdMonth);
      calendarOfMonthShow.value = JSON.parse(
        JSON.stringify(calendarOfMonth.value)
      );

      if (!props.scrollChangeDate) return;

      // 改变日期选择的日期
      if (props.selectType === 'single') {
        let tempDate = {} as CalendarMonthType;
        let { day } = checkedDate.value[0];
        if (day > 30 || (day > 28 && month === 1)) {
          day = daysOfMonth(year)[month];
        }
        tempDate = { day, year, month };

        if (formatDisabledDate(tempDate)) return;

        // fix: change 事件会触发两次 https://github.com/TangSY/vue-hash-calendar/issues/47
        const {
          year: preYear,
          month: preMonth,
          day: preDay,
        } = checkedDate.value[0];
        if (preYear !== year || preMonth !== month || preDay !== day) {
          checkedDate.value = [{ day: tempDate.day, year, month }];
        }
      }
    };

    // 日历以月份方式展示
    const showMonth = () => {
      calendarY.value = 0;
      isShowWeek.value = false;
      calendarGroupHeight.value = calendarItemHeight.value * 6;

      isLastWeekInCurrentMonth.value = false;
      isNextWeekInCurrentMonth.value = false;

      calculateCalendarOfThreeMonth();
    };

    // 初始化日历
    const init = () => {
      if (props.selectType === 'single') {
        const { year, month } = checkedDate.value[0];
        currentYearMonth.value = { year, month };
      }
      nextTick(() => {
        calendarItemHeight.value = useRect(calendarItemRef[0]).height;
        calendarWeekTitleHeight.value = useRect(weekTitleRef).height;

        const calendarItemGroup = calendarItemRef || [];
        calendarItemGroup.forEach((item) => {
          if (!item) return;
          item.style.height = `${calendarItemHeight.value}px`;
        });

        if (isShowWeek.value) {
          showWeek();
          calendarGroupHeight.value = calendarItemHeight.value;
        } else {
          showMonth();
          calendarGroupHeight.value = calendarItemHeight.value * 6;
        }
      });
    };

    // 今天
    const today = () => {
      const { year, month, day } = transDateToYearMonthDay(new Date());

      if (props.selectType === 'single') {
        checkedDate.value = [{ year, month, day }];
      }

      currentYearMonth.value = { year, month };
      calculateCalendarOfThreeMonth();

      if (isShowWeek.value) {
        setTimeout(() => {
          isTouching.value = true;
          if (props.selectType === 'single') {
            const date = checkedDate.value[0];
            checkedDate.value = [{ ...date, year, month }];
          }
          showWeek();
        }, transitionDuration.value * 1000);
      }
    };

    // 显示上一周
    const getLastWeek = () => {
      const checked = lastWeek.value[selectedDayIndex.value];
      showWeek(checked);

      if (formatDisabledDate(checked)) return;

      if (!props.scrollChangeDate) return;

      checkedDate.value = [checked];
    };

    // 显示下一周
    const getNextWeek = () => {
      const checked = nextWeek.value[selectedDayIndex.value];
      showWeek(checked);

      if (formatDisabledDate(checked)) return;

      if (!props.scrollChangeDate) return;

      checkedDate.value = [checked];
    };

    // 获取上个月日历
    const getLastMonth = () => {
      translateIndex.value += 1;

      if (!isLastWeekInCurrentMonth.value) {
        currentYearMonth.value = {
          year: lastMonthYear.value,
          month: lastMonth.value,
        };
      }
      calculateCalendarOfThreeMonth();
    };

    // 获取下个月日历
    const getNextMonth = () => {
      translateIndex.value -= 1;

      if (!isNextWeekInCurrentMonth.value) {
        currentYearMonth.value = {
          year: nextMonthYear.value,
          month: nextMonth.value,
        };
      }
      calculateCalendarOfThreeMonth();
    };

    const dealCheckedDate = (date: CalendarMonthType) => {
      const { selectType, maxRange } = props;
      const { year, month, day } = date;
      const checked = checkedDate.value;

      if (selectType === 'single') {
        checkedDate.value = [{ year, month, day }];
      } else if (selectType === 'multiple') {
        const existIndex = checked.findIndex(
          (item) => compareDay(item, date) === 0
        );
        if (existIndex > -1) {
          checkedDate.value.splice(existIndex, 1);
        } else {
          if (maxRange && checked.length >= maxRange) {
            emit('overRange');
            return;
          }
          checkedDate.value = [...checked, date];
        }
      } else if (selectType === 'range') {
        date = { ...date, type: 'start' };
        if (!checked || !checked.length) {
          checkedDate.value = [date];
          return;
        }

        const [startDay, endDay] = getStartEndDay(checked);
        if (startDay && !endDay) {
          const compareToStart = compareDay(date, startDay);

          if (compareToStart === 1) {
            const dateArr = calcMiddleDay([
              checked[0],
              { ...date, type: 'end' },
            ]);
            if (maxRange && dateArr.length > maxRange) {
              emit('overRange');
              return;
            }
            checkedDate.value = dateArr;
          } else if (compareToStart === -1) {
            checkedDate.value = [date];
          } else if (props.allowSameDay) {
            date = { ...date, type: 'start-end' };
            checkedDate.value = [date, date];
          }
        } else {
          checkedDate.value = [date];
        }
      }
    };

    // 点击日历上的日期
    const clickCalendarDay = (date: CalendarMonthType) => {
      if (!date.day) return;

      if (formatDisabledDate(date)) return;

      dealCheckedDate(date);

      if (date.month === lastMonth.value && date.year === lastMonthYear.value) {
        getLastMonth();
      }
      if (date.month === nextMonth.value && date.year === nextMonthYear.value) {
        getNextMonth();
      }

      if (isShowWeek.value) {
        showWeek();
      }

      emit('click', date);
    };

    // 该日期是否为今天
    const isToday = (date: CalendarMonthType) =>
      yearOfToday.value === date.year &&
      monthOfToday.value === date.month &&
      dayOfToday.value === date.day;

    // 该日期是否为选中的日期
    const isCheckedDay = (date: CalendarMonthType) => {
      if (formatDisabledDate(date)) return false;

      const { year, month, day } = date;
      return checkedDate.value.some(
        (item) => item.year === year && item.month === month && item.day === day
      );
    };

    // 禁止继续往横向的当前方向滑动 （当设置 minDate 或 maxDate 时生效）
    const isDisabledHorizontalScroll = (direc: ScrollDirectionType) => {
      const minDate = getMinDate(props.minDate);
      const maxDate = getMaxDate(props.maxDate);

      if (isShowWeek.value) {
        const lastWeekLastedDay = new Date(
          `${lastWeek.value[6].year}/${lastWeek.value[6].month + 1}/${
            lastWeek.value[6].day
          }`
        ).getTime();
        const nextWeekFirstDay = new Date(
          `${nextWeek.value[0].year}/${nextWeek.value[0].month + 1}/${
            nextWeek.value[0].day
          }`
        ).getTime();
        if (direc === 'left' && maxDate) return nextWeekFirstDay >= maxDate;
        if (direc === 'right' && minDate) return lastWeekLastedDay <= minDate;
      } else {
        const lastMonthLastedDay = new Date(
          `${lastMonthYear.value}/${lastMonth.value + 1}/${
            daysOfMonth(lastMonthYear.value)[lastMonth.value]
          }`
        ).getTime();
        const nextMonthFirstDay = new Date(
          `${nextMonthYear.value}/${nextMonth.value + 1}/1`
        ).getTime();
        if (direc === 'left' && maxDate) return nextMonthFirstDay >= maxDate;
        if (direc === 'right' && minDate) return lastMonthLastedDay <= minDate;
      }

      return false;
    };

    // 是否可以滑动
    const isCanScroll = (dire: ScrollDirectionType) => {
      const scrollObj = {
        up: [true, 'up', 'vertical'],
        down: [true, 'down', 'vertical'],
        left: [true, 'left', 'horizontal'],
        right: [true, 'right', 'horizontal'],
      };

      const checkedScrollArr = scrollObj[dire];
      return !checkedScrollArr.some((item) => item === props.disabledScroll);
    };

    // 设置禁止滑动的方向
    const setDisabledScrollDirection = () => {
      touch.value.x < 0 && !isCanScroll('left') && (touch.value.x = 0);
      touch.value.x > 0 && !isCanScroll('right') && (touch.value.x = 0);
      touch.value.y < 0 && !isCanScroll('up') && (touch.value.y = 0);
      touch.value.y > 0 && !isCanScroll('down') && (touch.value.y = 0);
    };

    // 切换展示的星期
    const changeWeekView = ({ isNext }: { isNext: boolean }) => {
      if (timer) timer = null;

      timer = setTimeout(() => {
        isTouching.value = true;
        isNext ? getNextWeek() : getLastWeek();
      }, transitionDuration.value * 1000);
    };

    // 监听手指开始滑动事件
    const touchStart = (event: TouchEvent) => {
      emit('touchstart', event);

      touchStartPositionX.value = event.touches[0].clientX;
      touchStartPositionY.value = event.touches[0].clientY;
      touch.value = {
        x: 0,
        y: 0,
      };
      isTouching.value = true;
    };

    // 监听手指移动事件
    const touchMove = (event: TouchEvent) => {
      emit('touchmove', event);

      // fix: 禁止切换周模式显示后，日历区域上下滑动，页面不能触发上下滑动了 #62
      if (!props.disabledWeekView) {
        event.stopPropagation();
        if (event.cancelable) event.preventDefault();
      }

      const moveX = event.touches[0].clientX - touchStartPositionX.value;
      const moveY = event.touches[0].clientY - touchStartPositionY.value;
      if (Math.abs(moveX) > Math.abs(moveY)) {
        if (isDisabledHorizontalScroll(moveX < 0 ? 'left' : 'right')) return;

        touch.value = {
          x: moveX / useRect(calendarRef).width,
          y: 0,
        };
      } else {
        // 禁用周视图（禁止上下滑动）
        if (props.disabledWeekView) return;

        touch.value = {
          x: 0,
          y: moveY / useRect(calendarRef).height,
        };
      }

      setDisabledScrollDirection();
    };

    // 监听touch结束事件
    const touchEnd = (e: TouchEvent) => {
      emit('touchend', e);

      isTouching.value = false;
      if (
        Math.abs(touch.value.x) > Math.abs(touch.value.y) &&
        Math.abs(touch.value.x) > 0.2
      ) {
        if (touch.value.x > 0) {
          emit('slidechange', 'right');

          getLastMonth();
          if (isShowWeek.value) {
            changeWeekView({ isNext: false });
          }
        } else if (touch.value.x < 0) {
          emit('slidechange', 'left');

          getNextMonth();
          if (isShowWeek.value) {
            changeWeekView({ isNext: true });
          }
        }
      }
      if (
        Math.abs(touch.value.y) > Math.abs(touch.value.x) &&
        Math.abs(touch.value.y * useRect(calendarRef).height) > 50
      ) {
        if (touch.value.y > 0 && isShowWeek.value) {
          emit('slidechange', 'down');

          showMonth();
        } else if (touch.value.y < 0 && !isShowWeek.value) {
          emit('slidechange', 'up');

          showWeek();
        }
      } else {
        touch.value = {
          x: 0,
          y: 0,
        };
      }
    };

    // 当前日期是否需要标记
    const markDateColor = (date: CalendarMonthType, type: MarkType) => {
      const dateString = `${date.year}/${fillNumber(
        date.month + 1
      )}/${fillNumber(date.day)}`;
      const markDateTypeString = markDateTypeObj.value[dateString] || '';

      if (markDateTypeString.indexOf(type) === -1) return;

      return markDateColorObj.value[dateString];
    };

    // 日期格式转换
    const dateFormat = (dateArr: (string | Date)[]) => {
      dateArr.forEach((date, index) => {
        dateArr[index] = formatDate(date, 'YY/MM/DD');
      });

      return dateArr;
    };

    useMountedOrActivated(init);

    watch(
      () => props.markDate,
      (val) => {
        const objArr: {
          date: string[];
          type?: MarkType | undefined;
          color: string;
        }[] = [];

        val.forEach((item) => {
          const obj: MarkDateType = {
            date: [],
            color: '#1c71fb',
            type: props.markType,
          };

          if (typeof item === 'string' || typeof item === 'number') {
            obj.date = [item];
          } else {
            obj.color = item.color || '#1c71fb';
            obj.type = item.type || props.markType;
            obj.date = dateFormat(item.date || []) as string[];
          }

          objArr.push(obj);
        });

        markDateColorObj.value = {};
        markDateTypeObj.value = {};
        objArr.forEach((item) => {
          item.date.forEach((date) => {
            markDateColorObj.value[date] = item.color;
            markDateTypeObj.value[date] = item.type;
          });
        });
      },
      { deep: true, immediate: true }
    );

    watch(weekStartIndex, () => {
      calculateCalendarOfThreeMonth();
    });

    watch(
      () => props.defaultDate,
      (val) => {
        if (props.selectType === 'single' && val instanceof Date) {
          const year = val.getFullYear();
          const month = val.getMonth();

          currentYearMonth.value = { year, month };

          checkedDate.value = [transDateToYearMonthDay(val)];
        } else if (Array.isArray(val)) {
          const checked = val.map((item) => transDateToYearMonthDay(item));
          if (props.selectType === 'range') {
            checkedDate.value = calcMiddleDay([
              { ...checked[0], type: 'start' },
              { ...checked[1], type: 'end' },
            ]);
          } else {
            checkedDate.value = checked;
          }
        }
        calculateCalendarOfThreeMonth();
        if (isShowWeek.value) {
          showWeek();
        }
      },
      { immediate: true }
    );

    watch(
      checkedDate,
      (val) => {
        emit('change', val);
      },
      { deep: true, immediate: true }
    );

    watch(
      () => props.show,
      (val) => {
        if (val) {
          calculateCalendarOfThreeMonth();
          init();
        }
      },
      { immediate: true }
    );

    watch(currentYearMonth, () =>
      emit('yearMonthChange', currentYearMonth.value)
    );

    watch(isShowWeek, (val) => {
      if (val) {
        nextTick(() => {
          showWeek();
        });
      } else {
        nextTick(() => {
          showMonth();
        });
      }
    });

    watch(
      () => props.defaultYearMonth,
      (val) => {
        if (val) {
          currentYearMonth.value = val;
        }
      },
      { immediate: true }
    );

    watch(calendarGroupHeight, (val) => {
      emit('height', val + calendarWeekTitleHeight.value);
    });

    useExpose<CalendarDateExposeType>({
      today,
      getLastMonth,
      getNextMonth,
      changeWeekView,
    });

    const renderWeek = () => (
      <div class="calendar_week" ref={weekTitleRef}>
        {calendarWeek.value.map((item) => (
          <div class="calendar_item" key={item}>
            <p class="calendar_day">
              {slots.week ? slots.week({ week: item }) : item}
            </p>
          </div>
        ))}
      </div>
    );

    const getRangeDayClassName = (date: CalendarMonthType) => {
      if (props.selectType !== 'range') return '';

      const currDate = checkedDate.value.find(
        (item) => compareDay(item, date) === 0
      );
      if (!currDate) return '';

      const { type } = currDate;
      return type === 'start'
        ? ' calendar_range_checked calendar_range_start'
        : type === 'middle'
        ? ' calendar_range_checked calendar_range_middle'
        : type === 'end'
        ? ' calendar_range_checked calendar_range_end'
        : type === 'start-end'
        ? ' calendar_range_checked calendar_range_start-end'
        : '';
    };

    const renderDay = (date: CalendarMonthType, i: number) => {
      let dayEle: any = isFirstDayOfMonth(date, i)
        ? languageUtil[props.lang].MONTH[date.month]
        : date.day === 0
        ? ''
        : date.day;
      if (slots.day) {
        dayEle = slots.day({
          date,
          extendAttr: {
            isMarked: !!(
              markDateColor(date, 'circle') || markDateColor(date, 'dot')
            ),
            isDisabledDate: formatDisabledDate(date),
            isToday: isToday(date),
            isChecked: isCheckedDay(date),
            isCurrentMonthDay: !isNotCurrentMonthDay(date, i),
            isFirstDayOfMonth: isFirstDayOfMonth(date, i),
          },
        });
      }

      return (
        <div
          class={`calendar_day ${
            isFirstDayOfMonth(date, i)
              ? props.firstDayOfMonthClassName || 'calendar_first_today'
              : ''
          } ${
            isToday(date) ? props.todayClassName || 'calendar_day_today' : ''
          } ${
            isCheckedDay(date)
              ? props.checkedDayClassName || 'calendar_day_checked'
              : ''
          } ${
            isNotCurrentMonthDay(date, i) && props.showNotCurrentMonthDay
              ? props.notCurrentMonthDayClassName || 'calendar_day_not'
              : ''
          } ${markDateColor(date, 'circle') ? 'calendar_mark_circle' : ''}`}
          style={{ 'border-color': markDateColor(date, 'circle') }}
        >
          {dayEle}
        </div>
      );
    };

    const renderMonth = () =>
      calendarOfMonthShow.value.map((item, i) => (
        <li
          class="calendar_group_li"
          key={i}
          style={{
            transform: `translate3d(${
              (i -
                1 +
                translateIndex.value +
                (isTouching.value ? touch.value.x : 0)) *
              100
            }%, ${calendarY.value}px, 0)`,
            transitionDuration: `${
              isTouching.value ? 0 : transitionDuration.value
            }s`,
          }}
        >
          {item.map((date, j) => (
            <div
              class={`calendar_item ${
                formatDisabledDate(date)
                  ? props.disabledClassName || 'calendar_item_disable'
                  : ''
              }${getRangeDayClassName(date)}`}
              ref={(el) => {
                calendarItemRef.length = 0;
                calendarItemRef.push(el as HTMLElement);
              }}
              key={i + j}
              onClick={() => clickCalendarDay(date)}
            >
              {renderDay(date, i)}
              <div
                style={{ background: markDateColor(date, 'dot') }}
                class="calendar_dot"
              ></div>
            </div>
          ))}
        </li>
      ));

    const renderCalendarDate = () => (
      <div
        class="calendar_body"
        style={{
          display: props.show ? 'block' : 'none',
        }}
      >
        {renderWeek()}
        <div
          class="calendar_group"
          style={{ height: `${calendarGroupHeight.value}px` }}
          ref={calendarRef}
          onTouchstart={touchStart}
          onTouchmove={touchMove}
          onTouchend={touchEnd}
        >
          <ul
            style={{
              transform: `translate3d(${-translateIndex.value * 100}%, 0, 0)`,
            }}
          >
            {renderMonth()}
          </ul>
        </div>
      </div>
    );

    return () => renderCalendarDate();
  },
});
