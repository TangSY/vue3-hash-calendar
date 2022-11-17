import {
  computed,
  defineComponent,
  ref,
  watch,
  type ExtractPropTypes,
  type PropType,
} from 'vue';
import { ARROW_DOWN_IMG, ARROW_UP_IMG } from './constant';

// Types
import type {
  CalendarDateInstance,
  CalendarDateType,
  CalendarPanelType,
  CalendarExposeType,
  DisabledScrollType,
  EmitDateType,
  LangType,
  MarkDateType,
  MarkType,
  ModelType,
  PickerType,
  ScrollDirectionType,
  ThemeColorType,
  WeekStartType,
  SelectType,
  CalendarYearMonthType,
} from './types';

// Utils
import {
  compareDay,
  fillNumber,
  formatDate,
  getNextDay,
  getPrevDay,
  getToday,
  makeArrayProp,
  makeDateProp,
  makeNumberProp,
  makeStringProp,
  pick,
  truthProp,
} from './utils';
import languageUtil from './language';

// hooks
import { useExpose, useMountedOrActivated } from './hooks';
import CalendarDate from './CalendarDate';
import CalendarTime from './CalendarTime';
import CalendarYearMonth from './CalendarYearMonth';

export const calendarProps = {
  themeColor: {
    type: Object as PropType<ThemeColorType>,
    default: () => ({}),
  },
  changeYearFast: Boolean,
  showArrow: Boolean,
  showWeekView: Boolean,
  visible: Boolean,
  disabledWeekView: Boolean,
  showAction: truthProp,
  pickerType: makeStringProp<PickerType>('datetime'),
  selectType: makeStringProp<SelectType>('single'),
  allowSameDay: Boolean,
  showTodayButton: truthProp,
  defaultDatetime: [Date, Array] as PropType<Date | Date[] | null>,
  minDate: makeDateProp(null),
  maxDate: makeDateProp(null),
  format: makeStringProp(''),
  model: makeStringProp<ModelType>('inline'),
  markType: makeStringProp<MarkType>('dot'),
  markDate: makeArrayProp<MarkDateType>(),
  disabledDate: {
    type: Function,
    default: () => false,
  },
  disabledTime: {
    type: Function,
    default: () => false,
  },
  lang: makeStringProp<LangType>('CN'),
  scrollChangeDate: truthProp,
  minuteStep: makeNumberProp(1),
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

export type CalendarPropsType = ExtractPropTypes<typeof calendarProps>;

export default defineComponent({
  name: 'VueHashCalendar',

  props: calendarProps,

  emits: [
    'update:visible',
    'update:showWeekView',
    'calendarTypeChange',
    'click',
    'confirm',
    'change',
    'slidechange',
    'touchstart',
    'touchmove',
    'touchend',
  ],

  setup(props, { emit, slots }) {
    const calendarRef = ref<CalendarDateInstance>();
    const isShowCalendar = ref(true);
    const isShowWeek = ref(props.showWeekView);
    const calendarBodyHeight = ref(0);
    const firstTimes = ref(true);
    const currentYearMonth = ref<CalendarYearMonthType>({
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
    });

    const limitDateRange = (
      date: Date,
      minDate = props.minDate,
      maxDate = props.maxDate
    ) => {
      if (minDate && compareDay(date, minDate) === -1) {
        return minDate;
      }
      if (maxDate && compareDay(date, maxDate) === 1) {
        return maxDate;
      }
      return date;
    };

    const getInitialDateTime = (defaultDatetime = props.defaultDatetime) => {
      const { selectType, minDate, maxDate, allowSameDay } = props;

      if (defaultDatetime === null) return defaultDatetime;

      const nowDate = getToday();
      const nowDatetime = new Date();

      if (selectType === 'range') {
        if (!Array.isArray(defaultDatetime)) {
          defaultDatetime = [];
        }
        const start = limitDateRange(
          defaultDatetime[0] || nowDate,
          minDate,
          allowSameDay ? maxDate : getPrevDay(maxDate)
        );
        const end = limitDateRange(
          defaultDatetime[1] || nowDate,
          allowSameDay ? minDate : getNextDay(minDate)
        );
        return [start, end];
      }

      if (selectType === 'multiple') {
        if (Array.isArray(defaultDatetime)) {
          return defaultDatetime.map((date) => limitDateRange(date));
        }
        return [limitDateRange(nowDate)];
      }

      if (!defaultDatetime || Array.isArray(defaultDatetime)) {
        defaultDatetime = nowDatetime;
      }

      return limitDateRange(defaultDatetime);
    };

    const currDateTime = ref(getInitialDateTime());
    const checkedDate = ref<CalendarDateType[]>([
      {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDate(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
      },
    ]);
    const yearMonthType = ref<CalendarPanelType>('date');

    const isShowDatetimePicker = computed({
      get() {
        return props.model === 'inline' ? true : props.visible;
      },
      set(val) {
        emit('update:visible', val);
      },
    });

    const isShowArrowImg = computed(
      () => props.showArrow && props.model === 'inline'
    );

    const calendarContentHeight = computed(() => {
      if (props.pickerType === 'time') {
        return 245;
      }
      return calendarBodyHeight.value;
    });

    // 滑动方向改变
    const slideChange = (direction: ScrollDirectionType) => {
      emit('slidechange', direction);
    };

    // 周视图开关
    const toggleWeek = () => {
      isShowWeek.value = !isShowWeek.value;

      if (isShowWeek.value) slideChange('up');
      else slideChange('down');
    };

    const today = () => {
      if (props.disabledDate(new Date())) return;

      calendarRef.value?.today();
    };

    const reset = (date = getInitialDateTime()) => {
      currDateTime.value = date;
    };

    const lastMonth = () => {
      calendarRef.value?.getLastMonth();
    };

    const nextMonth = () => {
      calendarRef.value?.getNextMonth();
    };

    const lastWeek = () => {
      calendarRef.value?.getLastMonth();
      calendarRef.value?.changeWeekView({ isNext: false });
    };

    const nextWeek = () => {
      calendarRef.value?.getNextMonth();
      calendarRef.value?.changeWeekView({ isNext: true });
    };

    const dateChange = (date: CalendarDateType[]) => {
      console.log('dateChange------');

      if (props.selectType === 'single') {
        checkedDate.value = [
          {
            ...checkedDate.value[0],
            ...date[0],
          },
        ];
      }
    };

    const dateClick = (date: CalendarDateType[], type?: CalendarPanelType) => {
      console.log('dateClick------');
      if (props.selectType === 'single') {
        checkedDate.value = [
          {
            ...checkedDate.value[0],
            ...date[0],
          },
        ];
        const { year, month, day, hours, minutes } = checkedDate.value[0];

        let fDate: EmitDateType = new Date(
          `${year}/${month + 1}/${day} ${hours}:${minutes}`
        );
        if (props.format) {
          fDate = formatDate(fDate, props.format, props.lang);
        }

        // 控制点击之后进入下一选择面板
        if (type) {
          switch (type) {
            case 'yearRange':
              yearMonthType.value = 'year';
              break;
            case 'year':
              yearMonthType.value = 'month';
              break;
            case 'month':
              currDateTime.value = new Date(fDate);
              yearMonthType.value = 'date';
              break;
          }

          emit('calendarTypeChange', yearMonthType.value);
        }

        emit('click', fDate);
      }
    };

    const yearMonthClick = (
      date: CalendarDateType,
      type: CalendarPanelType
    ) => {
      currentYearMonth.value = { year: date.year, month: date.month };
      dateClick([date], type);
    };

    const timeChange = (date: CalendarDateType) => {
      console.log('timeChange-----');

      if (props.selectType === 'single') {
        const { minutes, hours } = date;
        checkedDate.value = [
          {
            ...checkedDate.value[0],
            hours,
            minutes,
          },
        ];
      }
    };

    const close = () => {
      isShowDatetimePicker.value = false;
    };

    // 确认选择时间
    const confirm = () => {
      console.log('confirm-----');
      if (props.selectType === 'single') {
        const { year, month, day, hours, minutes } = checkedDate.value[0];

        let date: EmitDateType = new Date(
          `${year}/${month + 1}/${day} ${hours}:${minutes}`
        );
        if (props.format) {
          date = formatDate(date, props.format, props.lang);
        }
        emit('confirm', date);
      }

      if (props.model === 'dialog') {
        close();
      }
    };

    const formatDatetime = (time: Date | string, format: string) =>
      formatDate(time, format, props.lang);

    // 显示年月选择面板
    const showYearMonthPicker = () => {
      if (!props.changeYearFast) return;

      if (yearMonthType.value === 'date') {
        yearMonthType.value = 'month';
      } else if (yearMonthType.value === 'month') {
        yearMonthType.value = 'year';
      } else if (yearMonthType.value === 'year') {
        yearMonthType.value = 'yearRange';
      } else {
        yearMonthType.value = 'date';
      }
      emit('calendarTypeChange', yearMonthType.value);
    };

    // 显示日历控件
    const showCalendar = () => {
      console.log('showCalendar-----');

      if (isShowCalendar.value) {
        showYearMonthPicker();
      } else {
        emit('calendarTypeChange', 'date');
      }
      isShowCalendar.value = true;
    };

    // 显示时间选择控件
    const showTime = () => {
      isShowCalendar.value = false;

      emit('calendarTypeChange', 'time');

      // 重置年月选择面板
      yearMonthType.value = 'date';
    };

    // 高度变化
    const heightChange = (height: number) => {
      if (!firstTimes.value && props.model === 'dialog') return;

      calendarBodyHeight.value = height;
      firstTimes.value = false;
    };

    // 获取主题颜色
    const getThemeColor = () => {
      const cssVar: any = {};
      if (props.themeColor) {
        const themeColorKeys = Object.keys(props.themeColor || {}) as Array<
          keyof ThemeColorType
        >;

        if (themeColorKeys.length) {
          themeColorKeys.forEach((k) => {
            cssVar[`--hash-calendar-${k}`] = props.themeColor[k];
          });
        }
      }

      return cssVar;
    };

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
      checkedDate,
      () => {
        if (props.selectType === 'single') {
          const { year, month, day, hours, minutes } = checkedDate.value[0];

          let date: EmitDateType = new Date(
            `${year}/${month + 1}/${day} ${hours}:${minutes}`
          );
          if (props.format) {
            date = formatDate(date, props.format, props.lang);
          }
          emit('change', date);
        }
      },
      { deep: true }
    );

    // watch(currDateTime, (date) => {
    //   if (props.selectType === 'single' && date instanceof Date) {
    //     checkedDate.value = [
    //       {
    //         year: date.getFullYear(),
    //         month: date.getMonth(),
    //         day: date.getDate(),
    //         hours: date.getHours(),
    //         minutes: date.getMinutes(),
    //       },
    //     ];
    //   }
    // });

    watch(
      () => props.showWeekView,
      (val) => {
        isShowWeek.value = val;
      }
    );

    watch(
      () => [props.selectType, props.minDate, props.maxDate],
      () => reset(getInitialDateTime(currDateTime.value))
    );

    useExpose<CalendarExposeType>({
      today,
      reset,
      lastMonth,
      nextMonth,
      lastWeek,
      nextWeek,
    });

    const init = () => {
      const { defaultDatetime } = props;
      if (props.selectType === 'single' && defaultDatetime instanceof Date) {
        currentYearMonth.value = {
          year: defaultDatetime.getFullYear(),
          month: defaultDatetime.getMonth(),
        };

        const date = currDateTime.value;
        if (date instanceof Date) {
          checkedDate.value = [
            {
              year: date.getFullYear(),
              month: date.getMonth(),
              day: date.getDate(),
              hours: date.getHours(),
              minutes: date.getMinutes(),
            },
          ];
        }
      }

      if (props.pickerType === 'time') {
        showTime();
      } else {
        isShowCalendar.value = true;
      }
    };

    useMountedOrActivated(init);

    const renderTodayButton = () => {
      let todayEle: any = languageUtil[props.lang].TODAY;
      if (slots.today) {
        todayEle = slots.today();
      }

      if (props.showTodayButton) {
        return (
          <div
            class={`calendar_confirm ${
              props.disabledDate(new Date()) ? 'today_disable' : ''
            }`}
            onClick={today}
          >
            {todayEle}
          </div>
        );
      }
    };

    const renderConfirmButton = () => {
      let confirmEle: any = languageUtil[props.lang].CONFIRM;
      if (slots.confirm) {
        confirmEle = slots.confirm();
      }

      if (props.model === 'dialog') {
        return (
          <div class="calendar_confirm" onClick={confirm}>
            {confirmEle}
          </div>
        );
      }
    };

    const renderAction = () => {
      let timeText = '';
      let dateText = `${currentYearMonth.value.year}年${
        currentYearMonth.value.month + 1
      }月`;

      if (props.selectType === 'single') {
        const { year, month, day, hours, minutes } = checkedDate.value[0];

        timeText = formatDatetime(
          `${year}/${month + 1}/${day} ${fillNumber(hours)}:${fillNumber(
            minutes
          )}`,
          languageUtil[props.lang].DEFAULT_TIME_FORMAT
        );

        dateText = formatDatetime(
          `${year}/${month + 1}/${day}`,
          languageUtil[props.lang].DEFAULT_DATE_FORMAT
        );
      }

      if (props.showAction) {
        return (
          <div
            class="calendar_title"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            style={{
              bottom:
                props.model === 'dialog'
                  ? `${calendarContentHeight.value}px`
                  : 'unset',
            }}
          >
            {slots.action ? (
              slots.action()
            ) : (
              <>
                <div class="calendar_title_date">
                  {props.pickerType !== 'time' ? (
                    <span
                      class={`calendar_title_date_year ${
                        isShowCalendar.value ? 'calendar_title_date_active' : ''
                      }`}
                      onClick={showCalendar}
                    >
                      {dateText}
                    </span>
                  ) : null}

                  {props.pickerType !== 'date' &&
                  props.selectType === 'single' ? (
                    <span
                      class={`calendar_title_date_time ${
                        !isShowCalendar.value
                          ? 'calendar_title_date_active'
                          : ''
                      }`}
                      onClick={showTime}
                    >
                      {timeText}
                    </span>
                  ) : null}
                </div>
                {renderTodayButton()}
                {renderConfirmButton()}
              </>
            )}
          </div>
        );
      }

      return null;
    };

    const updateShowWeekView = (val: boolean) => {
      if (isShowWeek.value === val) return;

      if (val) {
        emit('calendarTypeChange', 'week');
      } else {
        emit('calendarTypeChange', 'date');
      }

      isShowWeek.value = val;
    };

    const yearMonthChange = (yearMonth: CalendarYearMonthType) => {
      currentYearMonth.value = yearMonth;
    };

    const renderCalendar = () => (
      <CalendarDate
        ref={calendarRef}
        v-slots={pick(slots, ['week', 'day'])}
        show={isShowCalendar.value}
        onHeight={heightChange}
        defaultDate={currDateTime.value}
        onTouchstart={touchStart}
        onTouchmove={touchMove}
        onTouchend={touchEnd}
        onSlidechange={slideChange}
        onYearMonthChange={yearMonthChange}
        onChange={dateChange}
        onClick={dateClick}
        showWeekView={isShowWeek.value}
        onUpdate:showWeekView={updateShowWeekView}
        {...pick(props, [
          'minDate',
          'maxDate',
          'disabledWeekView',
          'markType',
          'selectType',
          'markDate',
          'disabledDate',
          'lang',
          'weekStart',
          'disabledScroll',
          'scrollChangeDate',
          'showNotCurrentMonthDay',
          'firstDayOfMonthClassName',
          'todayClassName',
          'checkedDayClassName',
          'notCurrentMonthDayClassName',
          'disabledClassName',
        ])}
      />
    );

    const renderTimePicker = () => {
      if (props.pickerType === 'datetime' || props.pickerType === 'time') {
        return (
          <CalendarTime
            show={!isShowCalendar.value}
            defaultTime={currDateTime.value as Date}
            calendarDate={checkedDate.value[0]}
            onChange={timeChange}
            {...pick(props, ['minuteStep', 'disabledTime'])}
          />
        );
      }
    };

    const renderYearMonthPicker = () => (
      <CalendarYearMonth
        calendarContentHeight={calendarContentHeight.value}
        currentYearMonth={currentYearMonth.value}
        type={yearMonthType.value}
        onTouchstart={touchStart}
        onTouchmove={touchMove}
        onTouchend={touchEnd}
        onSlidechange={slideChange}
        onClick={yearMonthClick}
        {...pick(props, [
          'minDate',
          'maxDate',
          'disabledDate',
          'lang',
          'disabledScroll',
          'checkedDayClassName',
          'notCurrentMonthDayClassName',
          'disabledClassName',
        ])}
      />
    );

    const renderCtrlImg = () => {
      let confirmEle: any = (
        <img src={isShowWeek.value ? ARROW_DOWN_IMG : ARROW_UP_IMG} />
      );
      if (slots.arrow) {
        confirmEle = slots.arrow({ isShowWeek: isShowWeek.value });
      }

      if (isShowArrowImg.value) {
        return (
          <div
            class="ctrl-img"
            onClick={toggleWeek}
            style={{
              'margin-top':
                props.model === 'dialog'
                  ? `${calendarContentHeight.value}px`
                  : 'unset',
            }}
          >
            {confirmEle}
          </div>
        );
      }
    };

    const renderHashCalendar = () => {
      if (isShowDatetimePicker.value || props.model === 'inline') {
        return (
          <div
            class={`hash-calendar ${
              props.model === 'inline' ? 'calendar_inline' : ''
            }`}
            style={{
              ...getThemeColor(),
            }}
            onClick={close}
          >
            {renderAction()}
            <div
              class="calendar_content"
              style={{
                height: `${calendarContentHeight.value}px`,
              }}
              onClick={(e: MouseEvent) => {
                e.preventDefault();
                e.stopImmediatePropagation();
              }}
            >
              {props.pickerType !== 'time' ? renderCalendar() : ''}
              {renderTimePicker()}
              {props.changeYearFast ? renderYearMonthPicker() : ''}
            </div>
            {renderCtrlImg()}
          </div>
        );
      }
    };

    return () => renderHashCalendar();
  },
});
