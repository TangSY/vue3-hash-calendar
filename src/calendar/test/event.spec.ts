import { mount, later } from '../../../test';
import Calendar from '..';
import { defaultDate, ON_CHANGE_BASIC_CALLED_TIMES } from './utils';
import { slidechange } from './prop.spec';

test('test event of slidechange to right', async () => {
  const onCalendarTypeChange = jest.fn();
  const onChange = jest.fn();
  const onClick = jest.fn();
  const onConfirm = jest.fn();
  const onSlidechange = jest.fn();
  const onTouchstart = jest.fn();
  const onTouchmove = jest.fn();
  const onTouchend = jest.fn();
  const defaultDatetime = defaultDate;
  const wrapper = mount(Calendar, {
    props: {
      onCalendarTypeChange,
      onChange,
      onClick,
      onConfirm,
      onSlidechange,
      onTouchend,
      onTouchmove,
      onTouchstart,
      defaultDatetime,
    },
  });

  const calendar = wrapper.find('.calendar_group');

  slidechange(calendar, 'right');
  await later(200);
  expect(onCalendarTypeChange).toHaveBeenCalledTimes(0);
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 1);
  expect(onChange).toHaveBeenLastCalledWith(new Date(2021, 11, 1, 1, 1));
  expect(onClick).toHaveBeenCalledTimes(0);
  expect(onConfirm).toHaveBeenCalledTimes(0);
  expect(onSlidechange).toHaveBeenCalledTimes(1);
  expect(onSlidechange).toHaveBeenLastCalledWith('right');
  expect(onTouchstart).toHaveBeenCalledTimes(1);
  expect(onTouchmove).toHaveBeenCalled();
  expect(onTouchend).toHaveBeenCalledTimes(1);

  slidechange(calendar, 'right');
  await later(200);
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 2);
  expect(onChange).toHaveBeenLastCalledWith(new Date(2021, 10, 1, 1, 1));
});

test('test event of slidechange to left', async () => {
  const onCalendarTypeChange = jest.fn();
  const onChange = jest.fn();
  const onClick = jest.fn();
  const onConfirm = jest.fn();
  const onSlidechange = jest.fn();
  const onTouchstart = jest.fn();
  const onTouchmove = jest.fn();
  const onTouchend = jest.fn();
  const defaultDatetime = defaultDate;
  const wrapper = mount(Calendar, {
    props: {
      onCalendarTypeChange,
      onChange,
      onClick,
      onConfirm,
      onSlidechange,
      onTouchend,
      onTouchmove,
      onTouchstart,
      defaultDatetime,
    },
  });

  const calendar = wrapper.find('.calendar_group');

  slidechange(calendar, 'left');
  await later(200);
  expect(onCalendarTypeChange).toHaveBeenCalledTimes(0);
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 1);
  expect(onChange).toHaveBeenLastCalledWith(new Date(2022, 1, 1, 1, 1));
  expect(onClick).toHaveBeenCalledTimes(0);
  expect(onConfirm).toHaveBeenCalledTimes(0);
  expect(onSlidechange).toHaveBeenCalledTimes(1);
  expect(onSlidechange).toHaveBeenLastCalledWith('left');
  expect(onTouchstart).toHaveBeenCalledTimes(1);
  expect(onTouchmove).toHaveBeenCalled();
  expect(onTouchend).toHaveBeenCalledTimes(1);

  slidechange(calendar, 'left');
  await later(200);
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 2);
  expect(onChange).toHaveBeenLastCalledWith(new Date(2022, 2, 1, 1, 1));
});

test('test event of slidechange to up', async () => {
  const onCalendarTypeChange = jest.fn();
  const onChange = jest.fn();
  const onClick = jest.fn();
  const onConfirm = jest.fn();
  const onSlidechange = jest.fn();
  const onTouchstart = jest.fn();
  const onTouchmove = jest.fn();
  const onTouchend = jest.fn();
  const defaultDatetime = defaultDate;
  const wrapper = mount(Calendar, {
    props: {
      onCalendarTypeChange,
      onChange,
      onClick,
      onConfirm,
      onSlidechange,
      onTouchend,
      onTouchmove,
      onTouchstart,
      defaultDatetime,
    },
  });

  const calendar = wrapper.find('.calendar_group');

  slidechange(calendar, 'up');
  await later(200);
  expect(onCalendarTypeChange).toHaveBeenLastCalledWith('week');
  expect(onChange).toHaveBeenLastCalledWith(defaultDate);
  expect(onClick).toHaveBeenCalledTimes(0);
  expect(onConfirm).toHaveBeenCalledTimes(0);
  expect(onSlidechange).toHaveBeenCalledTimes(1);
  expect(onSlidechange).toHaveBeenLastCalledWith('up');
  expect(onTouchstart).toHaveBeenCalledTimes(1);
  expect(onTouchmove).toHaveBeenCalled();
  expect(onTouchend).toHaveBeenCalledTimes(1);
});

test('test event of slidechange to down', async () => {
  const onCalendarTypeChange = jest.fn();
  const onChange = jest.fn();
  const onClick = jest.fn();
  const onConfirm = jest.fn();
  const onSlidechange = jest.fn();
  const onTouchstart = jest.fn();
  const onTouchmove = jest.fn();
  const onTouchend = jest.fn();
  const defaultDatetime = defaultDate;
  const wrapper = mount(Calendar, {
    props: {
      onCalendarTypeChange,
      onChange,
      onClick,
      onConfirm,
      onSlidechange,
      onTouchend,
      onTouchmove,
      onTouchstart,
      defaultDatetime,
      showWeekView: true,
    },
  });

  const calendar = wrapper.find('.calendar_group');

  slidechange(calendar, 'down');
  await later(200);
  expect(onCalendarTypeChange).toHaveBeenLastCalledWith('date');
  expect(onChange).toHaveBeenLastCalledWith(defaultDate);
  expect(onClick).toHaveBeenCalledTimes(0);
  expect(onConfirm).toHaveBeenCalledTimes(0);
  expect(onSlidechange).toHaveBeenCalledTimes(1);
  expect(onSlidechange).toHaveBeenLastCalledWith('down');
  expect(onTouchstart).toHaveBeenCalledTimes(1);
  expect(onTouchmove).toHaveBeenCalled();
  expect(onTouchend).toHaveBeenCalledTimes(1);
});

test('test event of click', async () => {
  const onCalendarTypeChange = jest.fn();
  const onChange = jest.fn();
  const onClick = jest.fn();
  const onConfirm = jest.fn();
  const onSlidechange = jest.fn();
  const onTouchstart = jest.fn();
  const onTouchmove = jest.fn();
  const onTouchend = jest.fn();
  const defaultDatetime = defaultDate;
  const wrapper = mount(Calendar, {
    props: {
      onCalendarTypeChange,
      onChange,
      onClick,
      onConfirm,
      onSlidechange,
      onTouchend,
      onTouchmove,
      onTouchstart,
      defaultDatetime,
    },
  });

  const days = wrapper.findAll('.calendar_day');
  await days[56].trigger('click');

  expect(onChange).toHaveBeenLastCalledWith(new Date(2022, 0, 2, 1, 1));
  expect(onClick).toHaveBeenLastCalledWith(new Date(2022, 0, 2, 1, 1));
  expect(onConfirm).toHaveBeenCalledTimes(0);
  expect(onSlidechange).toHaveBeenCalledTimes(0);
  expect(onTouchstart).toHaveBeenCalledTimes(0);
  expect(onTouchmove).toHaveBeenCalledTimes(0);
  expect(onTouchend).toHaveBeenCalledTimes(0);

  await wrapper.setProps({ visible: true, model: 'dialog' });
  const confirm = wrapper.findAll('.calendar_confirm');
  await confirm[1].trigger('click');
  expect(onConfirm).toHaveBeenLastCalledWith(new Date(2022, 0, 2, 1, 1));

  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 1);
  await confirm[0].trigger('click');
  expect(onChange).toHaveBeenCalledTimes(ON_CHANGE_BASIC_CALLED_TIMES + 2);

  await wrapper.find('.calendar_title_date_time').trigger('click');
  expect(onCalendarTypeChange).toHaveBeenLastCalledWith('time');
});

test('test event of multiple overRange', async () => {
  const onOverRange = jest.fn();
  const wrapper = mount(Calendar, {
    props: {
      selectType: 'multiple',
      defaultDatetime: null,
      maxRange: 3,
      onOverRange,
    },
  });
  await later(200);

  const days = wrapper.findAll('.calendar_day');

  await days[55].trigger('click');
  expect(onOverRange).toHaveBeenCalledTimes(0);
  await days[56].trigger('click');
  expect(onOverRange).toHaveBeenCalledTimes(0);
  await days[57].trigger('click');
  expect(onOverRange).toHaveBeenCalledTimes(0);
  await days[58].trigger('click');
  expect(onOverRange).toHaveBeenCalledTimes(1);
});

test('test event of range overRange', async () => {
  const onOverRange = jest.fn();
  const wrapper = mount(Calendar, {
    props: {
      selectType: 'range',
      defaultDatetime: null,
      maxRange: 3,
      onOverRange,
    },
  });
  await later(200);

  const days = wrapper.findAll('.calendar_day');

  await days[55].trigger('click');
  await days[57].trigger('click');
  expect(onOverRange).toHaveBeenCalledTimes(0);
  await days[55].trigger('click');
  await days[58].trigger('click');
  expect(onOverRange).toHaveBeenCalledTimes(1);
});

test('test change event by change-year-fast', async () => {
  const onChange = jest.fn();
  const wrapper = mount(Calendar, {
    props: {
      changeYearFast: true,
      defaultDatetime: defaultDate,
      onChange,
    },
  });
  await later(200);

  const date = wrapper.find('.calendar_title_date_year');
  await date.trigger('click');
  await date.trigger('click');
  await date.trigger('click');

  const yearItem = wrapper.findAll('.year-body-item');
  await yearItem[16].trigger('click');
  expect(onChange).toHaveBeenLastCalledWith(new Date(2030, 0, 1, 1, 1));

  const yearContent = wrapper.findAll('.year-body-item-content');
  await yearContent[16].trigger('click');
  expect(onChange).toHaveBeenLastCalledWith(new Date(2033, 0, 1, 1, 1));

  await yearContent[16].trigger('click');
  expect(onChange).toHaveBeenLastCalledWith(new Date(2033, 4, 1, 1, 1));
});
