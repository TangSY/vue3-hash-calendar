import { Calendar } from '..';
import { mount, later } from '../../../test';
import {
  defaultMultipleDate,
  defaultRangeDate,
  defaultYearMonth,
  ON_CHANGE_BASIC_CALLED_TIMES,
} from './utils';

test('range-type with allow-same-day', async () => {
  const onChange = jest.fn();
  const wrapper = mount(Calendar, {
    props: {
      selectType: 'range',
      defaultYearMonth,
      onChange,
    },
  });
  await later(200);
  expect(onChange).toBeCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES);

  const days = wrapper.findAll('.calendar_item');
  await days[55].trigger('click');
  expect(onChange).toBeCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES);
  await days[55].trigger('click');
  expect(onChange).toBeCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES);

  wrapper.setProps({ allowSameDay: true });
  await days[55].trigger('click');
  expect(onChange).toBeCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES);
  await days[55].trigger('click');
  expect(onChange).toBeCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 1);
  expect(onChange).toHaveBeenLastCalledWith([
    new Date(2022, 0, 1),
    new Date(2022, 0, 1),
  ]);
  expect(days[55].attributes('class')).toContain('calendar_range_start-end');
});

test('range-type with defaultDatetime', async () => {
  const onChange = jest.fn();
  const wrapper = mount(Calendar, {
    props: {
      selectType: 'range',
      defaultDatetime: defaultRangeDate,
      defaultYearMonth,
      onChange,
    },
  });
  await later(200);

  const days = wrapper.findAll('.calendar_item');
  expect(days[55].attributes('class')).toContain('calendar_range_start');
  expect(days[56].attributes('class')).toContain('calendar_range_middle');
  expect(days[57].attributes('class')).toContain('calendar_range_middle');
  expect(days[58].attributes('class')).toContain('calendar_range_middle');
  expect(days[59].attributes('class')).toContain('calendar_range_end');
});

test('range-type with click', async () => {
  const onChange = jest.fn();
  const wrapper = mount(Calendar, {
    props: {
      selectType: 'range',
      defaultYearMonth,
      onChange,
    },
  });
  await later(200);
  expect(onChange).toBeCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES);

  const days = wrapper.findAll('.calendar_item');
  await days[55].trigger('click');
  expect(onChange).toBeCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES);
  await days[57].trigger('click');
  expect(onChange).toBeCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 1);
  expect(onChange).toHaveBeenLastCalledWith([
    new Date(2022, 0, 1),
    new Date(2022, 0, 2),
    new Date(2022, 0, 3),
  ]);

  await days[58].trigger('click');
  expect(onChange).toBeCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 1);
  expect(wrapper.find('.calendar_range_start').exists()).toBeTruthy();
  expect(wrapper.find('.calendar_range_middle').exists()).toBeFalsy();
  expect(wrapper.find('.calendar_range_end').exists()).toBeFalsy();

  await days[56].trigger('click');
  expect(onChange).toBeCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 1);
  await days[59].trigger('click');
  expect(onChange).toBeCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 2);
  expect(onChange).toHaveBeenLastCalledWith([
    new Date(2022, 0, 2),
    new Date(2022, 0, 3),
    new Date(2022, 0, 4),
    new Date(2022, 0, 5),
  ]);
});