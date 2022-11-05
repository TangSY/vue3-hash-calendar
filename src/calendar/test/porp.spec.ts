import { DOMWrapper, VueWrapper } from '@vue/test-utils';
import { Calendar } from '..';
import { mount, later, trigger } from '../../../test';
import { ScrollDirectionType } from '../types';
import { defalutDateText, defalutMonthText, defaultDate } from './utils';

const slidechange = (
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
  const wrapper = mount(Calendar);

  await later();

  const date = wrapper.find('.calendar_title_date_year');
  date.trigger('click');
  await later();

  expect(wrapper.find('.year-body').exists()).toBeFalsy();

  await wrapper.setProps({ changeYearFast: true });
  date.trigger('click');
  await later();

  expect(wrapper.find('.year-body').attributes('style')).toContain(
    'display: block'
  );
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
  days[56].trigger('click');
  expect(onClick).toHaveBeenCalledTimes(0);
  days[55].trigger('click');
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

test('disabled-time prop', async () => {
  const wrapper = mount(Calendar);

  await later();
});
