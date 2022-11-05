import { Calendar } from '..';
import { mount, later } from '../../../test';
import {
  defalutDateText,
  defalutMonthText,
  defaultDate,
  nowDateText,
  nowMonthText,
} from './utils';

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
