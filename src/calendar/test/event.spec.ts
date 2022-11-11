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

  const days = wrapper.findAll('.calendar_day');
  const calendar = wrapper.find('.calendar_group');

  slidechange(calendar, 'right');
  await later(200);
  //   expect(onCalendarTypeChange).toHaveBeenCalledTimes(1);
  expect(onCalendarTypeChange).toHaveBeenLastCalledWith('month');
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
  //   expect(onCalendarTypeChange).toHaveBeenCalledTimes(1);
  expect(onCalendarTypeChange).toHaveBeenLastCalledWith('month');
  //   expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(new Date(2022, 1, 1, 1, 1));
  expect(onClick).toHaveBeenCalledTimes(0);
  expect(onConfirm).toHaveBeenCalledTimes(0);
  expect(onSlidechange).toHaveBeenCalledTimes(1);
  expect(onSlidechange).toHaveBeenLastCalledWith('left');
  expect(onTouchstart).toHaveBeenCalledTimes(1);
  expect(onTouchmove).toHaveBeenCalled();
  expect(onTouchend).toHaveBeenCalledTimes(1);
});
