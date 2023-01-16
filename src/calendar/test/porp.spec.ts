import { DOMWrapper, VueWrapper } from '@vue/test-utils';
import { Calendar } from '..';
import { mount, later, trigger } from '../../../test';
import { ScrollDirectionType } from '../types';
import {
  defalutDateText,
  defalutMonthText,
  defaultDate,
  maxDate,
  minDate,
} from './utils';

export const slidechange = (
  wrapper: Element | Window | DOMWrapper<Element> | VueWrapper<any>,
  dire: ScrollDirectionType
) => {
  switch (dire) {
    case 'left':
      trigger(wrapper, 'touchstart', 0, 0);
      trigger(wrapper, 'touchmove', -200, 0);
      trigger(wrapper, 'touchend', -200, 0);
      break;
    case 'right':
      trigger(wrapper, 'touchstart', 0, 0);
      trigger(wrapper, 'touchmove', 200, 0);
      trigger(wrapper, 'touchend', 200, 0);
      break;
    case 'up':
      trigger(wrapper, 'touchstart', 0, 0);
      trigger(wrapper, 'touchmove', 0, -200);
      trigger(wrapper, 'touchend', 0, -200);
      break;
    case 'down':
      trigger(wrapper, 'touchstart', 0, 0);
      trigger(wrapper, 'touchmove', 0, 200);
      trigger(wrapper, 'touchend', 0, 200);
      break;
  }
};

test('theme-color prop', async () => {
  const wrapper = mount(Calendar, {
    props: {
      themeColor: {
        'main-color': 'red',
        'bg-color': 'grey',
        'main-font-color': 'blue',
        'vice-font-color': 'green',
        'disabled-bg-color': 'black',
        'disabled-font-color': 'yellow',
      },
    },
  });
  await later();

  const calendar = wrapper.find('.hash-calendar');
  expect(calendar.attributes('style')).toContain(
    '--hash-calendar-main-color: red; --hash-calendar-bg-color: grey; --hash-calendar-main-font-color: blue; --hash-calendar-vice-font-color: green; --hash-calendar-disabled-bg-color: black; --hash-calendar-disabled-font-color: yellow;'
  );
});

test('change-year-fast prop', async () => {
  const wrapper = mount(Calendar, { props: { defaultDatetime: defaultDate } });
  await later();

  const date = wrapper.find('.calendar_title_date_year');
  await date.trigger('click');
  expect(wrapper.find('.year-body').exists()).toBeFalsy();

  const onCalendarTypeChange = jest.fn();
  await wrapper.setProps({ changeYearFast: true, onCalendarTypeChange });

  await date.trigger('click');
  expect(onCalendarTypeChange).toHaveBeenLastCalledWith('month');
  expect(wrapper.find('.year-body').attributes('style')).toContain(
    'display: block'
  );

  await date.trigger('click');
  expect(onCalendarTypeChange).toHaveBeenLastCalledWith('year');

  await date.trigger('click');
  expect(onCalendarTypeChange).toHaveBeenLastCalledWith('yearRange');

  await date.trigger('click');
  expect(onCalendarTypeChange).toHaveBeenLastCalledWith('date');

  await date.trigger('click');
  await date.trigger('click');
  await date.trigger('click');

  const yearItem = wrapper.findAll('.year-body-item');
  expect(yearItem[16].text()).toBe('2030-2039');
  await yearItem[16].trigger('click');
  expect(onCalendarTypeChange).toHaveBeenLastCalledWith('year');
  expect(date.text()).toBe('2030年01月01日');

  const yearContent = wrapper.findAll('.year-body-item-content');
  expect(yearContent[16].text()).toBe('2033');
  await yearContent[16].trigger('click');
  expect(onCalendarTypeChange).toHaveBeenLastCalledWith('month');
  expect(date.text()).toBe('2033年01月01日');

  expect(yearContent[16].text()).toBe('5月');
  await yearContent[16].trigger('click');
  expect(onCalendarTypeChange).toHaveBeenLastCalledWith('date');
  expect(date.text()).toBe('2033年05月01日');
});

test('checked-day-class-name prop', async () => {
  const wrapper = mount(Calendar);
  await later();

  expect(wrapper.find('.checked-day-class-name').exists()).toBeFalsy();
  await wrapper.setProps({ checkedDayClassName: 'checked-day-class-name' });
  expect(wrapper.find('.checked-day-class-name').exists()).toBeTruthy();
});

test('disabled-class-name prop', async () => {
  const wrapper = mount(Calendar, {
    props: {
      disabledDate: () => true,
    },
  });
  await later();

  expect(wrapper.find('.disabled-class-name').exists()).toBeFalsy();
  await wrapper.setProps({ disabledClassName: 'disabled-class-name' });
  expect(wrapper.find('.disabled-class-name').exists()).toBeTruthy();
});

test('first-day-of-month-class-name prop', async () => {
  const wrapper = mount(Calendar);
  await later();

  expect(wrapper.find('.first-day-of-month-class-name').exists()).toBeFalsy();
  await wrapper.setProps({
    firstDayOfMonthClassName: 'first-day-of-month-class-name',
  });
  expect(wrapper.find('.first-day-of-month-class-name').exists()).toBeTruthy();
});

test('not-current-month-day-class-name prop', async () => {
  const wrapper = mount(Calendar);
  await later();

  expect(
    wrapper.find('.not-current-month-day-class-name').exists()
  ).toBeFalsy();
  await wrapper.setProps({
    notCurrentMonthDayClassName: 'not-current-month-day-class-name',
  });
  expect(
    wrapper.find('.not-current-month-day-class-name').exists()
  ).toBeTruthy();
});

test('today-class-name prop', async () => {
  const wrapper = mount(Calendar);
  await later();

  expect(wrapper.find('.today-class-name').exists()).toBeFalsy();
  await wrapper.setProps({
    todayClassName: 'today-class-name',
  });
  expect(wrapper.find('.today-class-name').exists()).toBeTruthy();
});

test('default-datetime prop', async () => {
  const wrapper = mount(Calendar, { props: { defaultDatetime: defaultDate } });
  await later();

  const date = wrapper.find('.calendar_title_date_active');
  const firstDay = wrapper.findAll('.calendar_first_today');

  expect(date.text()).toBe(defalutDateText);
  expect(firstDay[1].text()).toBe(defalutMonthText);
});

test('disabled-date prop', async () => {
  const onClick = jest.fn();
  const disabledDate = (date: Date) => {
    if (new Date(date.setHours(0, 0, 0, 0)).getTime() > defaultDate.getTime()) {
      return true;
    }
  };
  const wrapper = mount(Calendar, {
    props: { defaultDatetime: defaultDate, disabledDate, onClick },
  });
  await later();

  const days = wrapper.findAll('.calendar_day');
  await days[56].trigger('click');
  expect(onClick).toHaveBeenCalledTimes(0);
  await days[55].trigger('click');
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('disabled-scroll prop default', async () => {
  const wrapper = mount(Calendar);
  await later();
  const calendar = wrapper.find('.calendar_group');

  slidechange(calendar, 'right');
  await later();
  slidechange(calendar, 'left');
  await later();
  slidechange(calendar, 'up');
  await later();
  slidechange(calendar, 'down');
  await later();
  expect(wrapper.emitted('slidechange')).toEqual([
    ['right'],
    ['left'],
    ['up'],
    ['down'],
  ]);
});

test('disabled-scroll prop set true', async () => {
  const wrapper = mount(Calendar, { props: { disabledScroll: true } });
  await later();
  const calendar = wrapper.find('.calendar_group');

  slidechange(calendar, 'right');
  await later();
  slidechange(calendar, 'left');
  await later();
  slidechange(calendar, 'up');
  await later();
  slidechange(calendar, 'down');
  await later();
  expect(wrapper.emitted('slidechange')).toBeFalsy();
});

test('disabled-scroll prop set left', async () => {
  const wrapper = mount(Calendar, { props: { disabledScroll: 'left' } });
  await later();
  const calendar = wrapper.find('.calendar_group');

  slidechange(calendar, 'right');
  await later();
  slidechange(calendar, 'left');
  await later();
  slidechange(calendar, 'up');
  await later();
  slidechange(calendar, 'down');
  await later();
  expect(wrapper.emitted('slidechange')).toEqual([['right'], ['up'], ['down']]);
});

test('disabled-scroll prop set right', async () => {
  const wrapper = mount(Calendar, { props: { disabledScroll: 'right' } });
  await later();
  const calendar = wrapper.find('.calendar_group');

  slidechange(calendar, 'right');
  await later();
  slidechange(calendar, 'left');
  await later();
  slidechange(calendar, 'up');
  await later();
  slidechange(calendar, 'down');
  await later();
  expect(wrapper.emitted('slidechange')).toEqual([['left'], ['up'], ['down']]);
});

test('disabled-scroll prop set up', async () => {
  const wrapper = mount(Calendar, { props: { disabledScroll: 'up' } });
  await later();
  const calendar = wrapper.find('.calendar_group');

  slidechange(calendar, 'right');
  await later();
  slidechange(calendar, 'left');
  await later();
  slidechange(calendar, 'up');
  await later();
  slidechange(calendar, 'down');
  await later();
  expect(wrapper.emitted('slidechange')).toEqual([['right'], ['left']]);
});

test('disabled-scroll prop set down', async () => {
  const wrapper = mount(Calendar, { props: { disabledScroll: 'down' } });
  await later();
  const calendar = wrapper.find('.calendar_group');

  slidechange(calendar, 'right');
  await later();
  slidechange(calendar, 'left');
  await later();
  slidechange(calendar, 'up');
  await later();
  slidechange(calendar, 'down');
  await later();
  expect(wrapper.emitted('slidechange')).toEqual([['right'], ['left'], ['up']]);
});

test('disabled-scroll prop set horizontal', async () => {
  const wrapper = mount(Calendar, { props: { disabledScroll: 'horizontal' } });
  await later();
  const calendar = wrapper.find('.calendar_group');

  slidechange(calendar, 'right');
  await later();
  slidechange(calendar, 'left');
  await later();
  slidechange(calendar, 'up');
  await later();
  slidechange(calendar, 'down');
  await later();
  expect(wrapper.emitted('slidechange')).toEqual([['up'], ['down']]);
});

test('disabled-scroll prop set vertical', async () => {
  const wrapper = mount(Calendar, { props: { disabledScroll: 'vertical' } });
  await later();
  const calendar = wrapper.find('.calendar_group');

  slidechange(calendar, 'right');
  await later();
  slidechange(calendar, 'left');
  await later();
  slidechange(calendar, 'up');
  await later();
  slidechange(calendar, 'down');
  await later();
  expect(wrapper.emitted('slidechange')).toEqual([['right'], ['left']]);
});

test('disabled-week-view prop', async () => {
  const wrapper = mount(Calendar, { props: { disabledWeekView: true } });
  await later();
  const calendar = wrapper.find('.calendar_group');

  slidechange(calendar, 'up');
  await later();
  slidechange(calendar, 'down');
  await later();
  expect(wrapper.emitted('slidechange')).toBeFalsy();

  await wrapper.setProps({ disabledWeekView: false });

  slidechange(calendar, 'up');
  await later();
  slidechange(calendar, 'down');
  await later();
  expect(wrapper.emitted('slidechange')).toEqual([['up'], ['down']]);
});

test('format prop', async () => {
  const wrapper = mount(Calendar, {
    props: { defaultDatetime: defaultDate, format: 'YY/MM/DD hh:mm' },
  });
  await later();

  const days = wrapper.findAll('.calendar_day');
  days[55].trigger('click');
  expect(wrapper.emitted('click')![0][0]).toEqual('2022/01/01 01:01');

  await wrapper.setProps({ format: 'YY-MM-DD' });
  days[55].trigger('click');
  expect(wrapper.emitted('click')![1][0]).toEqual('2022-01-01');
});

test('lang prop', async () => {
  const wrapper = mount(Calendar, { props: { defaultDatetime: defaultDate } });
  await later();

  const date = wrapper.find('.calendar_title_date_active');
  const firstDay = wrapper.findAll('.calendar_first_today');

  expect(date.text()).toBe(defalutDateText);
  expect(firstDay[1].text()).toBe(defalutMonthText);

  await wrapper.setProps({ lang: 'EN' });
  await later();
  expect(date.text()).toBe('Jan 01,2022');
  expect(firstDay[1].text()).toBe('Jan');
});

test('mark-date prop', async () => {
  const wrapper = mount(Calendar, {
    props: {
      defaultDatetime: defaultDate,
      markDate: [
        {
          color: '#f00',
          type: 'dot+circle',
          date: [`2022/01/01`, `2022/01/05`, `2022/01/10`],
        },
        {
          color: '#0f0',
          type: 'circle',
          date: [`2022/01/15`, `2022/01/20`, `2022/01/25`],
        },
        `2022/01/28`,
        `2022/01/16`,
        `2022/01/18`,
      ],
    },
  });
  await later();

  const days = wrapper.findAll('.calendar_day');
  const dots = wrapper.findAll('.calendar_dot');

  expect(days[55].attributes('style')).toContain('border-color: #f00');
  expect(dots[48].attributes('style')).toContain('background: rgb(255, 0, 0)');

  expect(days[69].attributes('style')).toContain('border-color: #0f0');
  expect(dots[62].attributes('style')).toBeFalsy();

  expect(days[70].attributes('style')).toBeFalsy();
  expect(dots[63].attributes('style')).toContain(
    'background: rgb(28, 113, 251)'
  );

  expect(days[71].attributes('style')).toBeFalsy();
  expect(dots[64].attributes('style')).toBeFalsy();
});

test('max-date prop', async () => {
  const wrapper = mount(Calendar, {
    props: { maxDate, defaultDatetime: new Date(2023, 1, 1, 1, 1) },
  });
  await later();

  const date = wrapper.find('.calendar_title_date_active');
  expect(date.text()).toBe('2022年02月01日');

  const days = wrapper.findAll('.calendar_item');

  await days[52].trigger('click');
  expect(wrapper.emitted('click')).toBeFalsy();
  expect(days[52].attributes('class')).toContain('calendar_item_disable');

  await days[51].trigger('click');
  expect(wrapper.emitted('click')).toBeTruthy();
  expect(days[51].attributes('class')).not.toContain('calendar_item_disable');

  const calendar = wrapper.find('.calendar_group');
  slidechange(calendar, 'right');
  await later();
  slidechange(calendar, 'left');
  await later();
  slidechange(calendar, 'left');
  await later();
  expect(wrapper.emitted('slidechange')).toEqual([['right'], ['left']]);

  await wrapper.setProps({ maxDate: new Date(2023, 1, 1, 1, 1) });
  expect(date.text()).toBe('2023年02月01日');
});

test('min-date prop', async () => {
  const wrapper = mount(Calendar, {
    props: { minDate, defaultDatetime: new Date(2021, 0, 1, 1, 1) },
  });
  await later();

  const date = wrapper.find('.calendar_title_date_active');
  expect(date.text()).toBe('2022年01月01日');

  const days = wrapper.findAll('.calendar_item');

  await days[54].trigger('click');
  expect(wrapper.emitted('click')).toBeFalsy();
  expect(days[54].attributes('class')).toContain('calendar_item_disable');

  await days[55].trigger('click');
  expect(wrapper.emitted('click')).toBeTruthy();
  expect(days[55].attributes('class')).not.toContain('calendar_item_disable');

  const calendar = wrapper.find('.calendar_group');
  slidechange(calendar, 'left');
  await later();
  slidechange(calendar, 'right');
  await later();
  slidechange(calendar, 'right');
  await later();
  expect(wrapper.emitted('slidechange')).toEqual([['left'], ['right']]);

  await wrapper.setProps({ minDate: new Date(2021, 0, 1, 1, 1) });
  expect(date.text()).toBe('2021年01月01日');
});

test('minute-step prop', async () => {
  const wrapper = mount(Calendar, {
    props: { pickerType: 'time', minuteStep: 2 },
  });
  await later(200);

  const time = wrapper.findAll('.time_item');

  expect(time[24].text()).toBe('00');
  expect(time[25].text()).toBe('02');
});

test('model prop', async () => {
  const wrapper = mount(Calendar, {
    props: { model: 'dialog', visible: true, defaultDatetime: defaultDate },
  });
  await later();

  expect(wrapper.html()).toMatchSnapshot();
  await wrapper.setProps({ visible: false });
  expect(wrapper.html()).toMatchSnapshot();
});

test('picker-type prop', async () => {
  const wrapper = mount(Calendar, {
    props: { defaultDatetime: defaultDate },
  });
  await later();

  expect(wrapper.find('.calendar_title_date_year').exists()).toBeTruthy();
  expect(wrapper.find('.calendar_title_date_time').exists()).toBeTruthy();

  await wrapper.setProps({ pickerType: 'datetime' });
  expect(wrapper.find('.calendar_title_date_year').exists()).toBeTruthy();
  expect(wrapper.find('.calendar_title_date_time').exists()).toBeTruthy();

  await wrapper.setProps({ pickerType: 'date' });
  expect(wrapper.find('.calendar_title_date_year').exists()).toBeTruthy();
  expect(wrapper.find('.calendar_title_date_time').exists()).toBeFalsy();

  await wrapper.setProps({ pickerType: 'time' });
  expect(wrapper.find('.calendar_title_date_year').exists()).toBeFalsy();
  expect(wrapper.find('.calendar_title_date_time').exists()).toBeTruthy();
});

test('scroll-change-date prop', async () => {
  const wrapper = mount(Calendar, { props: { defaultDatetime: defaultDate } });
  await later();

  const calendar = wrapper.find('.calendar_group');
  const days = wrapper.findAll('.calendar_day');

  expect(days[55].attributes('class')).toContain('calendar_day_checked');
  slidechange(calendar, 'left');
  await later();
  expect(days[51].attributes('class')).toContain('calendar_day_checked');
  slidechange(calendar, 'right');
  await later();

  await wrapper.setProps({ scrollChangeDate: false });
  expect(days[55].attributes('class')).toContain('calendar_day_checked');
  slidechange(calendar, 'left');
  await later();
  expect(days[51].attributes('class')).not.toContain('calendar_day_checked');
});

test('show-action prop', async () => {
  const wrapper = mount(Calendar);
  await later();

  expect(wrapper.find('.calendar_title').exists()).toBeTruthy();
  await wrapper.setProps({ showAction: false });
  expect(wrapper.find('.calendar_title').exists()).toBeFalsy();
});

test('show-arrow prop', async () => {
  const wrapper = mount(Calendar);
  await later();

  expect(wrapper.find('.ctrl-img').exists()).toBeFalsy();
  await wrapper.setProps({ showArrow: true });
  expect(wrapper.find('.ctrl-img').exists()).toBeTruthy();
});

test('show-not-current-month-day prop', async () => {
  const wrapper = mount(Calendar);
  await later();

  expect(wrapper.find('.calendar_day_not').exists()).toBeTruthy();
  await wrapper.setProps({ showNotCurrentMonthDay: false });
  expect(wrapper.find('.calendar_day_not').exists()).toBeFalsy();
});

test('show-today-button prop', async () => {
  const wrapper = mount(Calendar);
  await later();

  expect(wrapper.find('.calendar_confirm').exists()).toBeTruthy();
  await wrapper.setProps({ showTodayButton: false });
  expect(wrapper.find('.calendar_confirm').exists()).toBeFalsy();
});

test('show-week-view prop', async () => {
  const wrapper = mount(Calendar, {
    props: { defaultDatetime: defaultDate },
  });
  await later();

  const calendar = wrapper.find('.calendar_group');
  const li = wrapper.findAll('.calendar_group_li');

  expect(li[1].attributes('style')).toContain('translate3d(0%, 0px, 0)');
  slidechange(calendar, 'left');
  await later(400);
  expect(li[1].attributes('style')).toContain('translate3d(-100%, 0px, 0)');

  await wrapper.setProps({ showWeekView: true });
  await later(400);
  slidechange(calendar, 'right');
  await later(400);
  expect(li[1].attributes('style')).toContain('translate3d(0%, -400px, 0)');
});

test('disabled-time prop', async () => {
  const wrapper = mount(Calendar, {
    props: { pickerType: 'time', defaultDatetime: defaultDate },
  });
  await later(200);

  expect(wrapper.find('.time-disabled').exists()).toBeFalsy();
  await wrapper.setProps({
    disabledTime: (date: Date) => {
      const hours = date.getHours();
      const minute = date.getMinutes();

      if (hours > 2 || (hours === 2 && minute > 2)) {
        return true;
      }
      return false;
    },
  });
  expect(wrapper.find('.time-disabled').exists()).toBeTruthy();
});

test('select-type prop', async () => {
  const wrapper = mount(Calendar, {
    props: { selectType: 'single', defaultDatetime: defaultDate },
  });
  await later(200);

  const date = wrapper.find('.calendar_title_date_active');
  expect(date.text()).toBe(defalutDateText);

  await wrapper.setProps({ selectType: 'range' });
  expect(date.text()).toBe('2022年01月');

  await wrapper.setProps({ selectType: 'multiple' });
  expect(date.text()).toBe('2022年01月');
});
