import { defineComponent, ExtractPropTypes, PropType, ref } from 'vue';
import { useRect } from './hooks';
import { DisabledScrollType, ScrollDirectionType } from './types';
import { makeArrayProp } from './utils';

export const calendarScrollContainerProps = {
  disabledScroll: {
    type: [Boolean, String] as PropType<DisabledScrollType>,
    default: () => false,
  },
  calendarData: makeArrayProp<any>(),
};

export type CalendarScrollContainerPropsType = ExtractPropTypes<
  typeof calendarScrollContainerProps
>;

export default defineComponent({
  name: 'CalendarScrollContainer',

  props: calendarScrollContainerProps,

  emits: ['slidechange', 'touchstart', 'touchmove', 'touchend'],

  setup(props, { emit, slots }) {
    const containerRef = ref<HTMLDivElement>();
    const translateIndex = ref(0);
    const transitionDuration = ref(0.3);
    const touch = ref({
      x: 0,
      y: 0,
    });
    const isTouching = ref(false);
    const touchStartPositionX = ref(0);
    const touchStartPositionY = ref(0);
    const calendarY = ref(0);

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
      if (event.cancelable) event.preventDefault();
      event.stopPropagation();

      const moveX = event.touches[0].clientX - touchStartPositionX.value;
      const moveY = event.touches[0].clientY - touchStartPositionY.value;
      if (Math.abs(moveX) > Math.abs(moveY)) {
        touch.value = {
          x: moveX / useRect(containerRef).width,
          y: 0,
        };
      } else {
        touch.value = {
          x: 0,
          y: moveY / useRect(containerRef).height,
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

          translateIndex.value += 1;
        } else if (touch.value.x < 0) {
          emit('slidechange', 'left');

          translateIndex.value -= 1;
        }
      }
      if (
        Math.abs(touch.value.y) > Math.abs(touch.value.x) &&
        Math.abs(touch.value.y * useRect(containerRef).height) > 50
      ) {
        if (touch.value.y > 0) {
          emit('slidechange', 'down');
        } else if (touch.value.y < 0) {
          emit('slidechange', 'up');
        }
      } else {
        touch.value = {
          x: 0,
          y: 0,
        };
      }
    };

    const renderDateItem = () =>
      props.calendarData.map((item, i) => (
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
          {slots.default?.(item)}
        </li>
      ));

    const renderContainer = () => (
      <ul
        class="calendar_group_ul"
        ref="containerRef"
        style={{
          transform: `translate3d(${-translateIndex.value * 100}%, 0, 0)`,
        }}
        onTouchstart={touchStart}
        onTouchmove={touchMove}
        onTouchend={touchEnd}
      >
        {renderDateItem()}
      </ul>
    );

    return () => renderContainer();
  },
});
