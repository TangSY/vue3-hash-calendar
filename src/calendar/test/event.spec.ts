import { mount, later } from '../../../test';
import Calendar from '..';
import { defaultDate } from './utils';
import { slidechange } from './porp.spec';

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
  //   expect(onCalendarTypeChange).toHaveBeenCalledTimes(1);
  expect(onCalendarTypeChange).toHaveBeenLastCalledWith('date');
  //   expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(new Date(2021, 11, 1, 1, 1));
  expect(onClick).toHaveBeenCalledTimes(0);
  expect(onConfirm).toHaveBeenCalledTimes(0);
  expect(onSlidechange).toHaveBeenCalledTimes(1);
  expect(onSlidechange).toHaveBeenLastCalledWith('right');
  expect(onTouchstart).toHaveBeenCalledTimes(1);
  expect(onTouchmove).toHaveBeenCalled();
  expect(onTouchend).toHaveBeenCalledTimes(1);
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
  expect(onCalendarTypeChange).toHaveBeenLastCalledWith('date');
  expect(onChange).toHaveBeenLastCalledWith(new Date(2022, 1, 1, 1, 1));
  expect(onClick).toHaveBeenCalledTimes(0);
  expect(onConfirm).toHaveBeenCalledTimes(0);
  expect(onSlidechange).toHaveBeenCalledTimes(1);
  expect(onSlidechange).toHaveBeenLastCalledWith('left');
  expect(onTouchstart).toHaveBeenCalledTimes(1);
  expect(onTouchmove).toHaveBeenCalled();
  expect(onTouchend).toHaveBeenCalledTimes(1);
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

  expect(onChange).toHaveBeenCalledTimes(3);
  await confirm[0].trigger('click');
  expect(onChange).toHaveBeenCalledTimes(4);

  await wrapper.find('.calendar_title_date_time').trigger('click');
  expect(onCalendarTypeChange).toHaveBeenLastCalledWith('time');
});
