import {
  defineComponent,
  ExtractPropTypes,
  nextTick,
  PropType,
  ref,
  watch,
} from 'vue';
import { CalendarDateType } from './types';
import { checkPlatform, makeDateProp, makeNumberProp } from './utils';

export const calendarTimeProps = {
  show: Boolean,
  defaultTime: makeDateProp(new Date()),
  disabledTime: {
    type: Function,
    default: () => false,
  },
  minuteStep: makeNumberProp(1),
  calendarDate: {
    type: Object as PropType<CalendarDateType>,
    default: () => ({}),
  },
};

export type CalendarTimePropsType = ExtractPropTypes<typeof calendarTimeProps>;

export default defineComponent({
  name: 'CalendarTime',

  props: calendarTimeProps,

  emits: ['change'],

  setup(props, { emit }) {
    const hashID = ref<string[]>([]);
    const hashClass = ref('');
    const checkedDate = ref({
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
    });
    const timeHeight = ref(0);
    const timeArray = ref<number[][]>([]);
    const timeStartY = ref(0);
    const timeStartUp = ref(0);

    hashID.value = [
      `time${Math.floor(Math.random() * 1000000)}`,
      `time${Math.floor(Math.random() * 1000000)}`,
    ];
    hashClass.value = `time_item_${Math.floor(Math.random() * 1000000)}`;

    // 初始化时间选择器数据
    const initTimeArray = () => {
      const hours: number[] = [];
      timeArray.value = [];
      for (let i = 0; i < 24; i++) {
        hours.push(i);
      }
      const minutes: number[] = [];
      for (let i = 0; i < 60; i++) {
        if (i % props.minuteStep === 0) {
          minutes.push(i);
        }
      }
      timeArray.value.push(hours, minutes);

      nextTick(() => {
        const checkHours = checkedDate.value.hours;
        const checkMinutes = checkedDate.value.minutes;

        const hashClassEle = document.querySelector(
          `.${hashClass.value}`
        ) as HTMLElement;
        const timeHeightStr = hashClassEle
          ? getComputedStyle(hashClassEle).height
          : '';
        timeHeight.value = parseFloat(timeHeightStr.split('px')[0]);

        const hoursUp = (2 - checkHours) * timeHeight.value;
        const hashIDEle = document.querySelector(
          `#${hashID.value[0]}`
        ) as HTMLElement;
        if (hashIDEle) {
          hashIDEle.style.transform = 'translate3d(0px,' + hoursUp + 'px,0px)';
        }

        const minutesUp =
          (2 - checkMinutes / props.minuteStep) * timeHeight.value;
        const hashIDEle1 = document.querySelector(
          `#${hashID.value[1]}`
        ) as HTMLElement;
        if (hashIDEle1) {
          hashIDEle1.style.transform =
            'translate3d(0px,' + minutesUp + 'px,0px)';
        }
      });
    };

    const formatDisabledDate = (time: number, index: number) => {
      const hours = index === 0 ? time : checkedDate.value.hours;
      const minutes = index === 1 ? time : checkedDate.value.minutes;
      const dateStr = `${props.calendarDate.year}/${
        props.calendarDate.month + 1
      }/${props.calendarDate.day} ${hours}:${minutes}`;
      const fDate = new Date(dateStr);

      return props.disabledTime(fDate);
    };

    const timeTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      timeStartY.value = e.changedTouches[0].pageY;
      const transform = e.currentTarget?.style.webkitTransform;
      if (transform) {
        timeStartUp.value = parseFloat(transform.split(' ')[1].split('px')[0]);
      }
    };

    const timeTouchEnd = (e: TouchEvent, index: number) => {
      const transform = e.currentTarget?.style.webkitTransform;
      let endUp = timeStartUp.value;
      if (transform) {
        endUp = parseFloat(
          e.currentTarget.style.webkitTransform.split(' ')[1].split('px')[0]
        );
      }

      const distance = Math.abs(endUp - timeStartUp.value);
      const upCount = Math.floor(distance / timeHeight.value) || 1;
      const halfWinWith = timeHeight.value / 2;
      let up = timeStartUp.value;

      if (endUp <= timeStartUp.value) {
        // 向上滑动 未过临界值
        if (distance <= halfWinWith) {
          up = timeStartUp.value;
        } else {
          up = timeStartUp.value - timeHeight.value * upCount;
          if (up < -(timeArray.value[index].length - 3) * timeHeight.value) {
            up = -(timeArray.value[index].length - 3) * timeHeight.value;
          }
        }
      } else if (distance <= halfWinWith) {
        // 向下滑动 未过临界值
        up = timeStartUp.value;
      } else {
        up = timeStartUp.value + timeHeight.value * upCount;
        if (up > timeHeight.value * 2) {
          up = timeHeight.value * 2;
        }
      }

      if (index === 0) {
        const hour = 2 - Math.round(up / timeHeight.value);

        if (formatDisabledDate(hour, index)) {
          up = timeStartUp.value;
        } else {
          checkedDate.value.hours = hour;
        }
      } else {
        const minute = 2 - Math.round(up / timeHeight.value);

        if (formatDisabledDate(minute, index)) {
          up = timeStartUp.value;
        } else {
          checkedDate.value.minutes = minute * props.minuteStep;
        }
      }
      e.currentTarget.style.webkitTransition = 'transform 300ms';
      e.currentTarget.style.webkitTransform =
        'translate3d(0px,' + up + 'px,0px)';
    };

    const timeTouchMove = (e: TouchEvent, index: number) => {
      const moveEndY = e.changedTouches[0].pageY;
      const Y = moveEndY - timeStartY.value;

      e.currentTarget.style.webkitTransform =
        'translate3d(0px,' + (Y + timeStartUp.value) + 'px,0px)';

      if (checkPlatform() === '2') {
        timeTouchEnd(e, index);
        return false;
      }
    };

    // 是否为当前选中的时间
    const isBeSelectedTime = (time: number, index: number) =>
      (index === 0 && time === checkedDate.value.hours) ||
      (index === 1 && time === checkedDate.value.minutes);

    // 校验时间范围
    const checkTimeRange = (range: string) => {
      if (!range) return;
      const timeArr = range.split('-');
      if (timeArr.length === 0 || timeArr.length > 2) return false;

      return timeArr.every((time) => {
        const mhArr = time.split(':');
        if (mhArr.length === 0 || mhArr.length > 2) return false;

        // 校验单个时间是否符合规范 00:00 - 24:00
        if (parseInt(mhArr[0], 10) < 0 || parseInt(mhArr[0], 10) > 24)
          return false;
        if (parseInt(mhArr[1], 10) < 0 || parseInt(mhArr[1], 10) > 59)
          return false;
        if (parseInt(mhArr[0], 10) === 24 && parseInt(mhArr[1], 10) > 0)
          return false;
        return true;
      });
    };

    watch(
      () => props.defaultTime,
      (val) => {
        if (!(val instanceof Date)) {
          throw new Error(
            "The calendar component's defaultTime must be date type!"
          );
        }
        checkedDate.value.hours = val.getHours();
        checkedDate.value.minutes = val.getMinutes();
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
          initTimeArray();
        }
      },
      { immediate: true }
    );

    watch(
      () => props.minuteStep,
      (val) => {
        if (val <= 0 || val >= 60) {
          throw new Error(`The minutes-step can't be: ${val}!`);
        }
        if (60 % val !== 0) {
          throw new Error('The minutes-step must be divided by 60!');
        }
      },
      { immediate: true }
    );
  },
});
