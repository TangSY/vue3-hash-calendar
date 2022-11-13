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
} from './types';

// Utils
import {
  fillNumber,
  formatDate,
  makeArrayProp,
  makeDateProp,
  makeNumberProp,
  makeStringProp,
  pick,
  truthProp,
} from './utils';
import languageUtil from './language';

// hooks
import { useExpose } from './hooks';
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
  showTodayButton: truthProp,
  defaultDatetime: makeDateProp(new Date()),
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
    const defaultDate: CalendarDateType = {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    };

    const calendarRef = ref<CalendarDateInstance>();
    const checkedDate = ref(defaultDate);
    const isShowCalendar = ref(false);
    const isShowWeek = ref(false);
    const calendarBodyHeight = ref(0);
    const firstTimes = ref(true);
    const currDateTime = ref(props.defaultDatetime);
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

    const reset = (date: Date = new Date()) => {
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

    const dateChange = (date: CalendarDateType) => {
      date.hours = checkedDate.value.hours;
      date.minutes = checkedDate.value.minutes;
      checkedDate.value = date;
    };

    const dateClick = (date: CalendarDateType, type?: CalendarPanelType) => {
      date.hours = checkedDate.value.hours;
      date.minutes = checkedDate.value.minutes;
      checkedDate.value = date;

      let fDate: EmitDateType = new Date(
        `${checkedDate.value.year}/${checkedDate.value.month + 1}/${
          checkedDate.value.day
        } ${checkedDate.value.hours}:${checkedDate.value.minutes}`
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
    };

    const timeChange = (date: CalendarDateType) => {
      date.year = checkedDate.value.year;
      date.month = checkedDate.value.month;
      date.day = checkedDate.value.day;
      checkedDate.value = date;
    };

    const close = () => {
      isShowDatetimePicker.value = false;
    };

    // 确认选择时间
    const confirm = () => {
      let date: EmitDateType = new Date(
        `${checkedDate.value.year}/${checkedDate.value.month + 1}/${
          checkedDate.value.day
        } ${checkedDate.value.hours}:${checkedDate.value.minutes}`
      );
      if (props.format) {
        date = formatDate(date, props.format, props.lang);
      }
      emit('confirm', date);
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
      () => props.pickerType,
      (val) => {
        if (val === 'time') {
          showTime();
        } else {
          showCalendar();
        }
      },
      { immediate: true }
    );

    watch(
      checkedDate,
      () => {
        let date: EmitDateType = new Date(
          `${checkedDate.value.year}/${checkedDate.value.month + 1}/${
            checkedDate.value.day
          } ${checkedDate.value.hours}:${checkedDate.value.minutes}`
        );
        if (props.format) {
          date = formatDate(date, props.format, props.lang);
        }
        emit('change', date);
      },
      { deep: true }
    );

    watch(
      () => props.showWeekView,
      (val) => {
        isShowWeek.value = val;
      },
      { immediate: true }
    );

    useExpose<CalendarExposeType>({
      today,
      reset,
      lastMonth,
      nextMonth,
      lastWeek,
      nextWeek,
    });

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
                      {formatDatetime(
                        `${checkedDate.value.year}/${
                          checkedDate.value.month + 1
                        }/${checkedDate.value.day}`,
                        languageUtil[props.lang].DEFAULT_DATE_FORMAT
                      )}
                    </span>
                  ) : null}

                  {props.pickerType !== 'date' ? (
                    <span
                      class={`calendar_title_date_time ${
                        !isShowCalendar.value
                          ? 'calendar_title_date_active'
                          : ''
                      }`}
                      onClick={showTime}
                    >
                      {formatDatetime(
                        `${checkedDate.value.year}/${
                          checkedDate.value.month + 1
                        }/${checkedDate.value.day} ${fillNumber(
                          checkedDate.value.hours
                        )}:${fillNumber(checkedDate.value.minutes)}`,
                        languageUtil[props.lang].DEFAULT_TIME_FORMAT
                      )}
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
      if (val) {
        emit('calendarTypeChange', 'week');
      } else {
        emit('calendarTypeChange', 'date');
      }

      isShowWeek.value = val;
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
        onChange={dateChange}
        onClick={dateClick}
        showWeekView={isShowWeek.value}
        onUpdate:showWeekView={updateShowWeekView}
        {...pick(props, [
          'minDate',
          'maxDate',
          'disabledWeekView',
          'markType',
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
      if (props.pickerType !== 'date') {
        return (
          <CalendarTime
            show={!isShowCalendar.value}
            defaultTime={currDateTime.value}
            calendarDate={checkedDate.value}
            onChange={timeChange}
            {...pick(props, ['minuteStep', 'disabledTime'])}
          />
        );
      }
    };

    const renderYearMonthPicker = () => (
      <CalendarYearMonth
        calendarContentHeight={calendarContentHeight.value}
        calendarDate={checkedDate.value}
        type={yearMonthType.value}
        onTouchstart={touchStart}
        onTouchmove={touchMove}
        onTouchend={touchEnd}
        onSlidechange={slideChange}
        onClick={dateClick}
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
