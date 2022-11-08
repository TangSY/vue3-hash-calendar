import { mount, later } from '../../../test';
import Calendar from '..';
import { defaultDate } from './utils';

test('day slot', async () => {
  const daySlot = (data: any) => {
    if (data.extendAttr.isMarked) {
      return '标记';
    }
    if (data.extendAttr.isDisabledDate) {
      return '禁用';
    }
    if (data.extendAttr.isToday) {
      return '今天';
    }
    if (data.extendAttr.isChecked) {
      return '选中';
    }
    if (!data.extendAttr.isCurrentMonthDay) {
      return '非本月日期';
    }
    if (data.extendAttr.isFirstDayOfMonth) {
      return '本月第一天';
    }
    return `${data.date.year}年${data.date.month + 1}月${data.date.day}日`;
  };

  const disabledDate = (date: Date) => {
    if (
      new Date(date.setHours(0, 0, 0, 0)).getTime() ===
      new Date(new Date(2022, 0, 14, 1, 1).setHours(0, 0, 0, 0)).getTime()
    ) {
      return true;
    }
  };

  const wrapper = mount(Calendar, {
    props: {
      disabledDate,
      defaultDatetime: defaultDate,
      markDate: ['2022/01/22'],
    },
    slots: {
      day: daySlot,
    },
  });
  await later(500);

  const days = wrapper.findAll('.calendar_day');
  expect(days[7].text()).toBe('非本月日期');
  expect(days[10].text()).toBe('本月第一天');
  expect(days[11].text()).toBe('2021年12月2日');
  expect(days[55].text()).toBe('选中');
  expect(days[68].text()).toBe('禁用');
  expect(days[76].text()).toBe('标记');
  expect(days.length).toBe(133);
});
