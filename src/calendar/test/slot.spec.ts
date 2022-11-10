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

test('week slot', async () => {
  const weekSlot = (data: any) => `星期${data.week}`;

  const wrapper = mount(Calendar, {
    slots: {
      week: weekSlot,
    },
  });
  await later(500);

  const days = wrapper.findAll('.calendar_day');

  expect(days[0].text()).toBe('星期日');
  expect(days[1].text()).toBe('星期一');
  expect(days[2].text()).toBe('星期二');
  expect(days[3].text()).toBe('星期三');
  expect(days[4].text()).toBe('星期四');
  expect(days[5].text()).toBe('星期五');
  expect(days[6].text()).toBe('星期六');
});

test('arrow slot', async () => {
  const arrowSlot = (data: any) => {
    if (data.isShowWeek) {
      return '展开';
    }
    return '收起';
  };

  const wrapper = mount(Calendar, {
    props: { showArrow: true },
    slots: {
      arrow: arrowSlot,
    },
  });
  await later(500);

  const ctrl = wrapper.find('.ctrl-img');
  expect(ctrl.text()).toBe('收起');

  await ctrl.trigger('click');
  expect(ctrl.text()).toBe('展开');

  await ctrl.trigger('click');
  expect(ctrl.text()).toBe('收起');
});

test('action slot', async () => {
  const text = '自定义操作栏';
  const actionSlot = () => text;

  const wrapper = mount(Calendar, {
    slots: {
      action: actionSlot,
    },
  });
  await later(500);

  const action = wrapper.find('.calendar_title');
  expect(action.text()).toBe(text);
});

test('today slot', async () => {
  const text = '今天按钮';
  const todaySlot = () => text;

  const wrapper = mount(Calendar, {
    slots: {
      today: todaySlot,
    },
  });
  await later(500);

  const btn = wrapper.findAll('.calendar_confirm');
  expect(btn[0].text()).toBe(text);
});

test('confirm slot', async () => {
  const text = '确定按钮';
  const confirmSlot = () => text;

  const wrapper = mount(Calendar, {
    props: {
      model: 'dialog',
      visible: true,
    },
    slots: {
      confirm: confirmSlot,
    },
  });
  await later(500);

  const btn = wrapper.findAll('.calendar_confirm');
  expect(btn[1].text()).toBe(text);
});
