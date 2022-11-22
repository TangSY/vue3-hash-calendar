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
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES);

  const days = wrapper.findAll('.calendar_item');
  await days[55].trigger('click');
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES);
  await days[55].trigger('click');
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES);

  wrapper.setProps({ allowSameDay: true });
  await days[55].trigger('click');
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES);
  await days[55].trigger('click');
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 1);
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
  const onClick = jest.fn();
  const wrapper = mount(Calendar, {
    props: {
      selectType: 'range',
      defaultYearMonth,
      onChange,
      onClick,
    },
  });
  await later(200);
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES);

  const days = wrapper.findAll('.calendar_item');
  await days[55].trigger('click');
  expect(onClick).toHaveBeenLastCalledWith(new Date(2022, 0, 1));
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES);
  await days[57].trigger('click');
  expect(onClick).toHaveBeenLastCalledWith(new Date(2022, 0, 3));
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 1);
  expect(onChange).toHaveBeenLastCalledWith([
    new Date(2022, 0, 1),
    new Date(2022, 0, 2),
    new Date(2022, 0, 3),
  ]);

  await days[58].trigger('click');
  expect(onClick).toHaveBeenLastCalledWith(new Date(2022, 0, 4));
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 1);
  expect(wrapper.find('.calendar_range_start').exists()).toBeTruthy();
  expect(wrapper.find('.calendar_range_middle').exists()).toBeFalsy();
  expect(wrapper.find('.calendar_range_end').exists()).toBeFalsy();

  await days[56].trigger('click');
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 1);
  await days[59].trigger('click');
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 2);
  expect(onChange).toHaveBeenLastCalledWith([
    new Date(2022, 0, 2),
    new Date(2022, 0, 3),
    new Date(2022, 0, 4),
    new Date(2022, 0, 5),
  ]);
});

test('multiple-type with defaultDatetime', async () => {
  const onChange = jest.fn();
  const wrapper = mount(Calendar, {
    props: {
      selectType: 'multiple',
      defaultDatetime: defaultMultipleDate,
      defaultYearMonth,
      onChange,
    },
  });
  await later(200);

  const days = wrapper.findAll('.calendar_day');
  expect(days[55].attributes('class')).toContain('calendar_day_checked');
  expect(days[56].attributes('class')).not.toContain('calendar_day_checked');
  expect(days[59].attributes('class')).toContain('calendar_day_checked');
  expect(days[60].attributes('class')).not.toContain('calendar_day_checked');
  expect(days[64].attributes('class')).toContain('calendar_day_checked');
});

test('multiple-type with click', async () => {
  const onChange = jest.fn();
  const onClick = jest.fn();
  const wrapper = mount(Calendar, {
    props: {
      selectType: 'multiple',
      defaultDatetime: defaultMultipleDate,
      defaultYearMonth,
      onChange,
      onClick,
    },
  });
  await later(200);

  const days = wrapper.findAll('.calendar_day');
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES);
  await days[55].trigger('click');
  expect(onClick).toHaveBeenLastCalledWith(new Date(2022, 0, 1));
  expect(onChange).toHaveBeenLastCalledWith([
    new Date(2022, 0, 5),
    new Date(2022, 0, 10),
  ]);
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 1);
  await days[59].trigger('click');
  expect(onChange).toHaveBeenLastCalledWith([new Date(2022, 0, 10)]);
  await days[64].trigger('click');
  expect(onChange).toHaveBeenLastCalledWith([]);
  await days[55].trigger('click');
  expect(onChange).toHaveBeenLastCalledWith([new Date(2022, 0, 1)]);
});

test('range-type with format', async () => {
  const onChange = jest.fn();
  const wrapper = mount(Calendar, {
    props: {
      selectType: 'range',
      format: 'YY/MM/DD',
      defaultDatetime: defaultRangeDate,
      defaultYearMonth,
      onChange,
    },
  });
  await later(200);

  expect(onChange).toHaveBeenLastCalledWith([
    '2022/01/01',
    '2022/01/02',
    '2022/01/03',
    '2022/01/04',
    '2022/01/05',
  ]);

  const days = wrapper.findAll('.calendar_day');
  await days[55].trigger('click');
  await days[57].trigger('click');
  expect(onChange).toHaveBeenLastCalledWith([
    '2022/01/01',
    '2022/01/02',
    '2022/01/03',
  ]);
});

test('multiple-type with format', async () => {
  const onChange = jest.fn();
  const wrapper = mount(Calendar, {
    props: {
      selectType: 'multiple',
      format: 'YY/MM/DD',
      defaultDatetime: defaultMultipleDate,
      defaultYearMonth,
      onChange,
    },
  });
  await later(200);

  expect(onChange).toHaveBeenLastCalledWith([
    '2022/01/01',
    '2022/01/05',
    '2022/01/10',
  ]);

  const days = wrapper.findAll('.calendar_day');
  await days[55].trigger('click');
  await days[57].trigger('click');
  expect(onChange).toHaveBeenLastCalledWith([
    '2022/01/05',
    '2022/01/10',
    '2022/01/03',
  ]);
});
